import { Link, useLocation, useParams } from "react-router";
import type { DetailNavState } from "../models/detail-nav";

/** Type guard that checks whether a location state value is a valid {@link DetailNavState}. */
function isDetailNavState(value: unknown): value is DetailNavState {
	if (typeof value !== "object" || value === null) return false;
	const obj = value as Record<string, unknown>;
	return typeof obj.basePath === "string" && Array.isArray(obj.items);
}

/**
 * Prev/next navigation rendered at the bottom of detail pages.
 * Reads the item list from React Router location state so it works
 * without any props. Renders nothing when state is absent (direct URL access).
 */
function DetailNav() {
	const { state } = useLocation();
	const { id } = useParams();

	if (!isDetailNavState(state) || !id) return null;

	const index = state.items.findIndex((item) => item.id === id);
	if (index === -1) return null;

	const prev = index > 0 ? state.items[index - 1] : null;
	const next = index < state.items.length - 1 ? state.items[index + 1] : null;

	if (!prev && !next) return null;

	return (
		<nav className="DetailNav" aria-label="Previous and next items">
			{prev ? (
				<Link to={`${state.basePath}/${prev.id}`} state={state} className="DetailNav-prev" viewTransition>
					&larr; {prev.name}
				</Link>
			) : (
				<span />
			)}
			{next ? (
				<Link to={`${state.basePath}/${next.id}`} state={state} className="DetailNav-next" viewTransition>
					{next.name} &rarr;
				</Link>
			) : (
				<span />
			)}
		</nav>
	);
}

export default DetailNav;
