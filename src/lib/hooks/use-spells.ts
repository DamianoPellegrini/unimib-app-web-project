import React from "react";
import { API_BASE_URL } from "../constants";
import type { DetailNavState } from "../models/detail-nav";
import type { Spell, SpellType } from "../models/spell";
import { useFetch } from "./use-fetch";

/** Filter options for the spell list. */
type UseSpellsOptions = {
	textSearch?: string;
	type?: SpellType;
	/** When true, skips the fetch entirely (e.g. when nav state is already available). */
	skip?: boolean;
};

/**
 * Fetches all spells and applies client-side filtering.
 * Also builds a {@link DetailNavState} from the unfiltered list for prev/next navigation.
 */
export function useSpells(filters?: UseSpellsOptions) {
	const { textSearch, type, skip } = filters ?? {};
	const { data, ...rest } = useFetch<Spell[]>(`${API_BASE_URL}/Spells`, {
		headers: { "Cache-Control": "max-age=31536000, immutable" },
		fetchOnMount: !skip,
	});

	// Client-side filtering to avoid debouncing and potential API rate limits
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

	const navState = React.useMemo<DetailNavState | undefined>(
		() =>
			data
				? { basePath: "/spells", items: data.map((s) => ({ id: s.id, name: s.name ?? "Unknown spell" })) }
				: undefined,
		[data],
	);

	return { spells: filteredSpells, navState, ...rest };
}

/** Fetches a single spell by its id. */
export function useSpell(id: string) {
	const { data, ...rest } = useFetch<Spell>(`${API_BASE_URL}/Spells/${id}`);
	return { spell: data, ...rest };
}
