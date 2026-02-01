import React from "react";
import { API_BASE_URL } from "../constants";
import type { House } from "../models/house";
import { useFetch } from "./use-fetch";

type UseHousesOptions = {
	textSearch?: string;
};

export function useHouses(filters?: UseHousesOptions) {
	const { data, ...rest } = useFetch<House[]>(`${API_BASE_URL}/Houses`);
	const { textSearch } = filters ?? {};

	const normalizedText = React.useMemo(() => textSearch?.toLowerCase(), [textSearch]);

	// Filtering lato client per evitare di dove fare debouncing ed evitare eventuali rate limit con API
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

	return { houses: filteredElixirs, ...rest };
}

export function useHouse(id: string) {
	const { data, ...rest } = useFetch<House>(`${API_BASE_URL}/Houses/${id}`);
	return { house: data, ...rest };
}
