import React from "react";
import { API_BASE_URL } from "../constants";
import type { DetailNavState } from "../models/detail-nav";
import type { Wizard } from "../models/wizard";
import { useFetch } from "./use-fetch";

/** Filter options for the wizard list. */
type UseWizardsOptions = {
	textSearch?: string;
};

/**
 * Fetches all wizards and applies client-side text filtering.
 * Also builds a {@link DetailNavState} from the unfiltered list for prev/next navigation.
 */
export function useWizards(filters?: UseWizardsOptions) {
	const { data, ...rest } = useFetch<Wizard[]>(`${API_BASE_URL}/Wizards`, {
		headers: { "Cache-Control": "max-age=31536000, immutable" },
	});
	const { textSearch } = filters ?? {};

	const normalizedText = React.useMemo(() => textSearch?.toLowerCase(), [textSearch]);

	// Client-side filtering to avoid debouncing and potential API rate limits
	const filteredWizards = React.useMemo(
		() =>
			normalizedText
				? data?.filter(
						(w) =>
							w.firstName?.toLowerCase().includes(normalizedText) ||
							w.lastName?.toLowerCase().includes(normalizedText) ||
							w.elixirs?.some((e) => e.name?.toLowerCase().includes(normalizedText)),
					)
				: data,
		[normalizedText, data],
	);

	const navState = React.useMemo<DetailNavState | undefined>(
		() =>
			data
				? {
						basePath: "/wizards",
						items: data.map((w) => ({
							id: w.id,
							name: [w.firstName, w.lastName].filter(Boolean).join(" ") || "Unknown wizard",
						})),
					}
				: undefined,
		[data],
	);

	return { wizards: filteredWizards, navState, ...rest };
}

/** Fetches a single wizard by its id. */
export function useWizard(id: string) {
	const { data, ...rest } = useFetch<Wizard>(`${API_BASE_URL}/Wizards/${id}`);
	return { wizard: data, ...rest };
}
