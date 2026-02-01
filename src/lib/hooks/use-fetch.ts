import React from "react";
import { sleep } from "../utils";

type HTTPError = {
	status: number;
	statusText: string;
	[key: string]: unknown;
};

type RequestInitWithoutSignal = Omit<RequestInit, "signal">;

type UseFetchOptions = {
	/**
	 * Numero di retries
	 * @default 0
	 */
	retries?: number;
	/**
	 * Delay da aspettare per ogni retry
	 * @default 500ms
	 */
	retryDelayMs?: number;
	/**
	 * Determina se riprovare o no dato un certo errore
	 * @default () => true
	 */
	retryOn?: (error: unknown) => boolean;
	/**
	 * Se fare un fetch automatico al mount (dove cambiano i parametri)
	 * @default true
	 */
	fetchOnMount?: boolean;
	/** Determina quando la richiesta cambia, se io passo dei parametri al fetchInit */
	requestKey?: readonly unknown[];
} & RequestInitWithoutSignal;

/**
 * Hook to fetch data from an {@link URL} using the {@link fetch} API.
 * @param input `string` or {@link URL}
 * @param options
 * @returns Data, errors, loading state, refetch functions
 */
export function useFetch<T>(input: string | URL, options?: UseFetchOptions) {
	const [data, setData] = React.useState<T | null>(null);
	const [error, setError] = React.useState<HTTPError | null>(null);
	const [isLoading, setLoading] = React.useState(false);

	const normalizedInput = React.useMemo(() => {
		if (input instanceof URL) return input.href;
		return input;
	}, [input]);

	const {
		retries = 0,
		retryDelayMs = 500,
		retryOn,
		fetchOnMount = true,
		requestKey = [],
		...fetchOptions
	} = options ?? {};

	const abortCtrlRef = React.useRef<AbortController | null>(null);
	const retryOnRef = React.useRef(retryOn);

	React.useEffect(() => {
		retryOnRef.current = retryOn;
	}, [retryOn]);

	const performFetch = React.useCallback(async () => {
		abortCtrlRef.current?.abort();

		const controller = new AbortController();
		abortCtrlRef.current = controller;

		setLoading(true);
		setError(null);

		let attempts = 0;
		while (attempts <= retries) {
			try {
				const response = await fetch(normalizedInput, {
					...fetchOptions,
					signal: controller.signal,
				});

				const responseData = (await response.json()) as T | Record<string, unknown>;

				if (!response.ok) {
					const httpError: HTTPError = {
						status: response.status,
						statusText: response.statusText,
						...(responseData as Record<string, unknown>),
					};

					if (attempts < retries && retryOnRef.current?.(httpError)) {
						attempts++;
						await sleep(retryDelayMs);
						continue;
					}

					setError(httpError);
					setLoading(false);
					return;
				}

				setData(responseData as T);
				setLoading(false);
				return;
			} catch (err) {
				if (err instanceof DOMException && err.name === "AbortError") {
					// Ignoro errori Abort dato che sono causati dai re-render quando cambiano i paramtri della chiamata
					setLoading(false);
					return;
				}

				if (attempts < retries && retryOnRef.current?.(err)) {
					attempts++;
					await sleep(retryDelayMs);
					continue;
				}

				throw err;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [normalizedInput, retries, retryDelayMs, ...requestKey]);

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
