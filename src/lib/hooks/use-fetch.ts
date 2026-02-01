import React from "react";
import { sleep } from "../utils";

/** Artificial delay (ms) applied in dev mode to make loading states visible. */
const DEV_DELAY_MS = import.meta.env.DEV ? 1000 : 0;

/** Shape of the error object stored in state when a request fails. */
type HTTPError = {
	status: number;
	statusText: string;
	[key: string]: unknown;
};

type RequestInitWithoutSignal = Omit<RequestInit, "signal">;

/** Options accepted by {@link useFetch} on top of the standard RequestInit fields. */
type UseFetchOptions = {
	/**
	 * Number of extra attempts after the first failure.
	 * @default 0
	 */
	retries?: number;
	/**
	 * Milliseconds to wait between retries.
	 * @default 500
	 */
	retryDelayMs?: number;
	/**
	 * Callback that decides whether to retry a given error.
	 * Stored in a ref so that a new reference does not trigger a refetch.
	 * @default () => true
	 */
	retryOn?: (error: unknown) => boolean;
	/**
	 * If `true`, the request fires automatically on mount.
	 * @default true
	 */
	fetchOnMount?: boolean;
	/**
	 * List of primitive values that, when changed, cause a refetch.
	 * They are spread into the dependency array so comparison happens
	 * by value rather than by reference on the options object.
	 *
	 * Useful when `RequestInit` properties (e.g. `headers`) depend on
	 * state that changes over time: since `fetchInit` is captured in the
	 * closure, a change in `requestKey` recreates `performFetch` and
	 * captures the updated values.
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
 * Hook for making HTTP requests with loading, error, and retry handling.
 *
 * {@link RequestInit} properties (e.g. `headers`, `method`) are passed
 * straight to the {@link fetch} call.
 * If their values depend on dynamic state, use `requestKey` to tell
 * React when to re-run the request.
 *
 * @example
 * ```tsx
 * // Simple request
 * const { data, isLoading, error } = useFetch<User[]>("/api/users");
 * ```
 *
 * @example
 * ```tsx
 * // With retry and dynamic headers
 * const { data } = useFetch<Profile>(`/api/profile`, {
 *   headers: { Authorization: `Bearer ${token}` },
 *   retries: 2,
 *   retryDelayMs: 1000,
 *   requestKey: [token],
 * });
 * ```
 *
 * @param input Request URL, `string` or {@link URL}
 * @param options Hook options + {@link RequestInit} properties (without `signal`)
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
