import React from "react";
import { API_BASE_URL } from "../constants";
import type { DetailNavState } from "../models/detail-nav";
import type { ElixirIngredient } from "../models/elixir";
import { useFetch } from "./use-fetch";

/** Filter options for the ingredient list. */
type UseIngredientsOptions = {
	textSearch?: string;
	/** When true, skips the fetch entirely (e.g. when nav state is already available). */
	skip?: boolean;
};

/**
 * Fetches all ingredients and applies client-side text filtering.
 * Also builds a {@link DetailNavState} from the unfiltered list for prev/next navigation.
 */
export function useIngredients(filters?: UseIngredientsOptions) {
	const { textSearch, skip } = filters ?? {};
	const { data, ...rest } = useFetch<ElixirIngredient[]>(`${API_BASE_URL}/Ingredients`, {
		fetchOnMount: !skip,
	});

	const normalizedText = React.useMemo(() => textSearch?.toLowerCase(), [textSearch]);

	// Client-side filtering to avoid debouncing and potential API rate limits
	const filteredElixirs = React.useMemo(
		() => (normalizedText ? data?.filter((e) => e.name?.toLowerCase().includes(normalizedText)) : data),
		[normalizedText, data],
	);

	const navState = React.useMemo<DetailNavState | undefined>(
		() =>
			data
				? {
						basePath: "/ingredients",
						items: data.map((i) => ({ id: i.id, name: i.name ?? "Unknown ingredient" })),
					}
				: undefined,
		[data],
	);

	return { ingredients: filteredElixirs, navState, ...rest };
}

/** Fetches a single ingredient by its id. */
export function useIngredient(id: string) {
	const { data, ...rest } = useFetch<ElixirIngredient>(`${API_BASE_URL}/Ingredients/${id}`);
	return { ingredient: data, ...rest };
}
