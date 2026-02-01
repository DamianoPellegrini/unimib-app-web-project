import React from "react";
import { API_BASE_URL } from "../constants";
import type { ElixirIngredient } from "../models/elixir";
import { useFetch } from "./use-fetch";

type UseIngredientsOptions = {
	textSearch?: string;
};

export function useIngredients(filters?: UseIngredientsOptions) {
	const { data, ...rest } = useFetch<ElixirIngredient[]>(`${API_BASE_URL}/Ingredients`);
	const { textSearch } = filters ?? {};

	const normalizedText = React.useMemo(() => textSearch?.toLowerCase(), [textSearch]);

	// Filtering lato client per evitare di dove fare debouncing ed evitare eventuali rate limit con API
	const filteredElixirs = React.useMemo(
		() => (normalizedText ? data?.filter((e) => e.name?.toLowerCase().includes(normalizedText)) : data),
		[normalizedText, data],
	);

	return { ingredients: filteredElixirs, ...rest };
}

export function useIngredient(id: string) {
	const { data, ...rest } = useFetch<ElixirIngredient>(`${API_BASE_URL}/Ingredients/${id}`);
	return { ingredient: data, ...rest };
}
