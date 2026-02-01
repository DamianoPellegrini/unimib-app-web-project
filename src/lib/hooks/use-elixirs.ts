import React from "react";
import { API_BASE_URL } from "../constants";
import type { Elixir, ElixirDifficulty } from "../models/elixir";
import { useFetch } from "./use-fetch";

type UseElixirsOptions = {
	textSearch?: string;
	difficulty?: ElixirDifficulty;
};

export function useElixirs(filters?: UseElixirsOptions) {
	const { data, ...rest } = useFetch<Elixir[]>(`${API_BASE_URL}/Elixirs`, {
		headers: { "Cache-Control": "max-age=31536000, immutable" },
	});
	const { textSearch, difficulty } = filters ?? {};

	// Filtering lato client per evitare di dove fare debouncing ed evitare eventuali rate limit con API
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

	return { elixirs: filteredElixirs, ...rest };
}

export function useElixir(id: string) {
	const { data, ...rest } = useFetch<Elixir>(`${API_BASE_URL}/Elixirs/${id}`);
	return { elixir: data, ...rest };
}
