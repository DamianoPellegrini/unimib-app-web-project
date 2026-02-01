import React from "react";
import { API_BASE_URL } from "../constants";
import type { DetailNavState } from "../models/detail-nav";
import type { House } from "../models/house";
import { useFetch } from "./use-fetch";

/** Filter options for the house list. */
type UseHousesOptions = {
	textSearch?: string;
};

/**
 * Fetches all houses and applies client-side text filtering.
 * Also builds a {@link DetailNavState} from the unfiltered list for prev/next navigation.
 */
export function useHouses(filters?: UseHousesOptions) {
	const { data, ...rest } = useFetch<House[]>(`${API_BASE_URL}/Houses`);
	const { textSearch } = filters ?? {};

	const normalizedText = React.useMemo(() => textSearch?.toLowerCase(), [textSearch]);

	// Client-side filtering to avoid debouncing and potential API rate limits
	const filteredElixirs = React.useMemo(
		() =>
			normalizedText
				? data?.filter(
						(e) =>
							e.name?.toLowerCase().includes(normalizedText) ||
							e.animal?.toLowerCase().includes(normalizedText) ||
							e.commonRoom?.toLowerCase().includes(normalizedText) ||
							e.element?.toLowerCase().includes(normalizedText) ||
							e.founder?.toLowerCase().includes(normalizedText) ||
							e.ghost?.toLowerCase().includes(normalizedText) ||
							e.houseColours?.toLowerCase().includes(normalizedText) ||
							e.traits?.some((i) => i.name?.toLowerCase().includes(normalizedText)) ||
							e.heads?.some(
								(i) =>
									i.firstName?.toLowerCase().includes(normalizedText) ||
									i.lastName?.toLowerCase().includes(normalizedText),
							),
					)
				: data,
		[normalizedText, data],
	);

	const navState = React.useMemo<DetailNavState | undefined>(
		() =>
			data
				? { basePath: "/houses", items: data.map((h) => ({ id: h.id, name: h.name ?? "Unknown house" })) }
				: undefined,
		[data],
	);

	return { houses: filteredElixirs, navState, ...rest };
}

/** Fetches a single house by its id. */
export function useHouse(id: string) {
	const { data, ...rest } = useFetch<House>(`${API_BASE_URL}/Houses/${id}`);
	return { house: data, ...rest };
}
