import React from "react";
import { API_BASE_URL } from "../constants";
import type { Spell, SpellType } from "../models/spell";
import { useFetch } from "./use-fetch";

type UseSpellsOptions = {
	textSearch?: string;
	type?: SpellType;
};

export function useSpells(filters?: UseSpellsOptions) {
	const { data, ...rest } = useFetch<Spell[]>(`${API_BASE_URL}/Spells`, {
		headers: { "Cache-Control": "max-age=31536000, immutable" },
	});
	const { textSearch, type } = filters ?? {};

	// Filtering lato client per evitare di dove fare debouncing ed evitare eventuali rate limit con API
	const filteredSpells = React.useMemo(
		() =>
			type || textSearch
				? data?.filter(
						(s) =>
							(type && s.type === type) ||
							(textSearch &&
								(s.name?.toLowerCase().includes(textSearch.toLowerCase()) ||
									s.incantation?.toLowerCase().includes(textSearch.toLowerCase()) ||
									s.effect?.toLowerCase().includes(textSearch.toLowerCase()) ||
									s.creator?.toLowerCase().includes(textSearch.toLowerCase()))),
					)
				: data,
		[textSearch, type, data],
	);

	return { spells: filteredSpells, ...rest };
}

export function useSpell(id: string) {
	const { data, ...rest } = useFetch<Spell>(`${API_BASE_URL}/Spells/${id}`);
	return { spell: data, ...rest };
}
