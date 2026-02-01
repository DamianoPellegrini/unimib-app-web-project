import React from "react";
import { API_BASE_URL } from "../constants";
import type { DetailNavState } from "../models/detail-nav";
import type { Elixir, ElixirDifficulty } from "../models/elixir";
import { useFetch } from "./use-fetch";

/** Filter options for the elixir list. */
type UseElixirsOptions = {
	textSearch?: string;
	difficulty?: ElixirDifficulty;
};

/**
 * Fetches all elixirs and applies client-side filtering.
 * Also builds a {@link DetailNavState} from the unfiltered list for prev/next navigation.
 */
export function useElixirs(filters?: UseElixirsOptions) {
	const { data, ...rest } = useFetch<Elixir[]>(`${API_BASE_URL}/Elixirs`, {
		headers: { "Cache-Control": "max-age=31536000, immutable" },
	});
	const { textSearch, difficulty } = filters ?? {};

	// Client-side filtering to avoid debouncing and potential API rate limits
	const filteredElixirs = React.useMemo(
		() =>
			difficulty || textSearch
				? data?.filter(
						(e) =>
							(difficulty && e.difficulty === difficulty) ||
							(textSearch &&
								(e.name?.toLowerCase().includes(textSearch.toLowerCase()) ||
									e.effect?.toLowerCase().includes(textSearch.toLowerCase()) ||
									e.sideEffects?.toLowerCase().includes(textSearch.toLowerCase()) ||
									e.characteristics?.toLowerCase().includes(textSearch.toLowerCase()) ||
									e.manufacturer?.toLowerCase().includes(textSearch.toLowerCase()) ||
									e.ingredients?.some((i) => i.name?.toLowerCase().includes(textSearch.toLowerCase())) ||
									e.inventors?.some((i) => i.firstName?.toLowerCase().includes(textSearch.toLowerCase())))),
					)
				: data,
		[textSearch, difficulty, data],
	);

	const navState = React.useMemo<DetailNavState | undefined>(
		() =>
			data
				? { basePath: "/elixirs", items: data.map((e) => ({ id: e.id, name: e.name ?? "Unknown elixir" })) }
				: undefined,
		[data],
	);

	return { elixirs: filteredElixirs, navState, ...rest };
}

/** Fetches a single elixir by its id. */
export function useElixir(id: string) {
	const { data, ...rest } = useFetch<Elixir>(`${API_BASE_URL}/Elixirs/${id}`);
	return { elixir: data, ...rest };
}
