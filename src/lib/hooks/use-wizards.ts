import React from "react";
import { API_BASE_URL } from "../constants";
import type { Wizard } from "../models/wizard";
import { useFetch } from "./use-fetch";

type UseWizardsOptions = {
	textSearch?: string;
};

export function useWizards(filters?: UseWizardsOptions) {
	const { data, ...rest } = useFetch<Wizard[]>(`${API_BASE_URL}/Wizards`, {
		headers: { "Cache-Control": "max-age=31536000, immutable" },
	});
	const { textSearch } = filters ?? {};

	const normalizedText = React.useMemo(() => textSearch?.toLowerCase(), [textSearch]);

	// Filtering lato client per evitare di dove fare debouncing ed evitare eventuali rate limit con API
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

	return { wizards: filteredWizards, ...rest };
}

export function useWizard(id: string) {
	const { data, ...rest } = useFetch<Wizard>(`${API_BASE_URL}/Wizards/${id}`);
	return { wizard: data, ...rest };
}
