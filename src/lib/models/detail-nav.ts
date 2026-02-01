/** Single entry in the prev/next navigation list. */
export interface DetailNavItem {
	id: string;
	name: string;
}

/**
 * State passed through React Router's location state to enable
 * prev/next navigation on detail pages.
 */
export interface DetailNavState {
	/** URL prefix for the entity type, e.g. "/elixirs". */
	basePath: string;
	/** Ordered list of all items of that entity (unfiltered). */
	items: DetailNavItem[];
}
