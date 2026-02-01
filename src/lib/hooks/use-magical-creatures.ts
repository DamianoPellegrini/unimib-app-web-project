import React from "react";
import { API_BASE_URL } from "../constants";
import type { DetailNavState } from "../models/detail-nav";
import type { CreatureClassification, MagicalCreature } from "../models/magical-creature";
import { useFetch } from "./use-fetch";

/** Filter options for the magical creature list. */
type UseMagicalCreaturesOptions = {
	textSearch?: string;
	classification?: CreatureClassification;
	/** When true, skips the fetch entirely (e.g. when nav state is already available). */
	skip?: boolean;
};

/**
 * Fetches all magical creatures and applies client-side filtering.
 * Also builds a {@link DetailNavState} from the unfiltered list for prev/next navigation.
 */
export function useMagicalCreatures(filters?: UseMagicalCreaturesOptions) {
	const { textSearch, classification, skip } = filters ?? {};
	const { data, ...rest } = useFetch<MagicalCreature[]>(`${API_BASE_URL}/MagicalCreature`, {
		headers: { "Cache-Control": "max-age=31536000, immutable" },
		fetchOnMount: !skip,
	});

	// Client-side filtering to avoid debouncing and potential API rate limits
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

	const navState = React.useMemo<DetailNavState | undefined>(
		() =>
			data
				? {
						basePath: "/magical-creatures",
						items: data.map((c) => ({ id: c.id, name: c.name ?? "Unknown creature" })),
					}
				: undefined,
		[data],
	);

	return { creatures: filteredCreatures, navState, ...rest };
}

/** Fetches a single magical creature by its id. */
export function useMagicalCreature(id: string) {
	const { data, ...rest } = useFetch<MagicalCreature>(`${API_BASE_URL}/MagicalCreatures/${id}`);
	return { creature: data, ...rest };
}
