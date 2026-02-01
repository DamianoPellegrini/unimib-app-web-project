import React from "react";
import { sleep } from "../utils";

const DEV_DELAY_MS = import.meta.env.DEV ? 1000 : 0;

type HTTPError = {
	status: number;
	statusText: string;
	[key: string]: unknown;
};

type RequestInitWithoutSignal = Omit<RequestInit, "signal">;

type UseFetchOptions = {
	/**
	 * Numero di tentativi aggiuntivi dopo il primo fallimento.
	 * @default 0
	 */
	retries?: number;
	/**
	 * Millisecondi di attesa tra un tentativo e il successivo.
	 * @default 500
	 */
	retryDelayMs?: number;
	/**
	 * Callback che decide se ritentare dato un errore. Viene salvata in un ref
	 * per evitare che una nuova reference causi un refetch.
	 * @default () => true
	 */
	retryOn?: (error: unknown) => boolean;
	/**
	 * Se `true`, la richiesta parte automaticamente al mount.
	 * @default true
	 */
	fetchOnMount?: boolean;
	/**
	 * Lista di valori primitivi che, se modificati, causano un refetch.
	 * Vengono espansi in un dependency array, cosi' il
	 * confronto avviene per valore e non per riferimento rispetto all'oggetto options.
	 *
	 * Utile quando proprietà di `RequestInit` (es. `headers`) dipendono da
	 * stato che cambia nel tempo: siccome `fetchInit` viene catturato nella
	 * closure, un cambio di `requestKey` ricrea `performFetch` e cattura
	 * i valori aggiornati.
	 *
	 * @example
	 * ```tsx
	 * const { token } = getSomeState();
	 * const { data } = useFetch(`${API}/protected`, {
	 *   headers: { Authorization: `Bearer ${token}` },
	 *   requestKey: [token],
	 * });
	 * ```
	 *
	 * @example
	 * ```tsx
	 * const { data } = useFetch(`${API}/Elixirs`, {
	 *   headers: { "Cache-Control": "max-age=31536000, immutable" },
	 * });
	 * ```
	 */
	requestKey?: readonly unknown[];
} & RequestInitWithoutSignal;

/**
 * Hook per eseguire richieste HTTP con gestione di loading, errori e retry.
 *
 * Le proprietà di {@link RequestInit} (es. `headers`, `method`) vengono
 * passate direttamente nella funzione {@link fetch}.
 * Se i loro valori dipendono da stato dinamico, usare `requestKey` per
 * segnalare a React quando rifare la richiesta.
 *
 * @example
 * ```tsx
 * // Richiesta semplice
 * const { data, isLoading, error } = useFetch<User[]>("/api/users");
 * ```
 *
 * @example
 * ```tsx
 * // Con retry e headers dinamici
 * const { data } = useFetch<Profile>(`/api/profile`, {
 *   headers: { Authorization: `Bearer ${token}` },
 *   retries: 2,
 *   retryDelayMs: 1000,
 *   requestKey: [token],
 * });
 * ```
 *
 * @param input URL della richiesta, `string` o {@link URL}
 * @param options Opzioni del hook + proprietà di {@link RequestInit} (senza `signal`)
 * @returns `{ data, error, isLoading, refetchAsync }`
 */
export function useFetch<T>(input: string | URL, options?: UseFetchOptions) {
	const {
		fetchOnMount = true,
		requestKey = [],
		retries = 0,
		retryDelayMs = 500,
		retryOn,
		...fetchInit
	} = options ?? {};

	const [data, setData] = React.useState<T | null>(null);
	const [error, setError] = React.useState<HTTPError | null>(null);
	const [isLoading, setLoading] = React.useState(fetchOnMount);

	const url = typeof input === "string" ? input : input.href;

	const abortCtrlRef = React.useRef<AbortController | null>(null);
	const retryOnRef = React.useRef(retryOn);

	React.useEffect(() => {
		retryOnRef.current = retryOn;
	}, [retryOn]);

	const performFetch = React.useCallback(async () => {
		abortCtrlRef.current?.abort();

		const controller = new AbortController();
		abortCtrlRef.current = controller;
		const { signal } = controller;

		setLoading(true);
		setError(null);

		if (DEV_DELAY_MS > 0) {
			await sleep(DEV_DELAY_MS);
			if (signal.aborted) return;
		}

		for (let attempt = 0; attempt <= retries; attempt++) {
			if (attempt > 0) {
				await sleep(retryDelayMs);
				if (signal.aborted) return;
			}

			try {
				const response = await fetch(url, { ...fetchInit, signal });

				if (!response.ok) {
					let body: Record<string, unknown> = {};
					try {
						body = (await response.json()) as Record<string, unknown>;
					} catch {
						/* non-JSON error body — ignore */
					}

					const httpError: HTTPError = {
						status: response.status,
						statusText: response.statusText,
						...body,
					};

					if (attempt < retries && retryOnRef.current?.(httpError) !== false) continue;

					setData(null);
					setError(httpError);
					setLoading(false);
					return;
				}

				setData((await response.json()) as T);
				setLoading(false);
				return;
			} catch (err) {
				if (signal.aborted) return;

				if (attempt < retries && retryOnRef.current?.(err) !== false) continue;

				setData(null);
				setError({ status: 0, statusText: err instanceof Error ? err.message : "Network error" });
				setLoading(false);
				return;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url, retries, retryDelayMs, ...requestKey]);

	React.useEffect(() => {
		if (!fetchOnMount) return;

		void performFetch();
		return () => abortCtrlRef.current?.abort();
	}, [performFetch, fetchOnMount]);

	return {
		data,
		error,
		isLoading,
		refetchAsync: performFetch,
		refetch: () => void performFetch(),
	};
}
