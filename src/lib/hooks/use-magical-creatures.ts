import React from "react";
import { API_BASE_URL } from "../constants";
import type { CreatureClassification, MagicalCreature } from "../models/magical-creature";
import { useFetch } from "./use-fetch";

type UseMagicalCreaturesOptions = {
	textSearch?: string;
	classification?: CreatureClassification;
};

export function useMagicalCreatures(filters?: UseMagicalCreaturesOptions) {
	const { data, ...rest } = useFetch<MagicalCreature[]>(`${API_BASE_URL}/MagicalCreature`, {
		headers: { "Cache-Control": "max-age=31536000, immutable" },
	});
	const { textSearch, classification } = filters ?? {};

	// Filtering lato client per evitare di dove fare debouncing ed evitare eventuali rate limit con API
	const filteredCreatures = React.useMemo(
		() =>
			classification || textSearch
				? data?.filter(
						(c) =>
							(classification && c.classification === classification) ||
							(textSearch &&
								(c.name?.toLowerCase().includes(textSearch.toLowerCase()) ||
									c.description?.toLowerCase().includes(textSearch.toLowerCase()) ||
									c.nativeTo?.toLowerCase().includes(textSearch.toLowerCase()))),
					)
				: data,
		[textSearch, classification, data],
	);

	return { creatures: filteredCreatures, ...rest };
}

export function useMagicalCreature(id: string) {
	const { data, ...rest } = useFetch<MagicalCreature>(`${API_BASE_URL}/MagicalCreatures/${id}`);
	return { creature: data, ...rest };
}
