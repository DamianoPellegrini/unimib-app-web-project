import { Link, useLocation, useParams } from "react-router";
import { isDetailNavState } from "../models/detail-nav";
import type { DetailNavState } from "../models/detail-nav";

type DetailNavProps = {
	/** Nav state fetched from the full list, used when location state is absent. */
	fallback?: DetailNavState;
};

/**
 * Prev/next navigation rendered at the bottom of detail pages.
 * Prefers location state (passed when navigating from an index page), but
 * falls back to a fetched list so the nav also works on direct URL access.
 */
function DetailNav({ fallback }: DetailNavProps) {
	const { state } = useLocation();
	const { id } = useParams();

	const navState = isDetailNavState(state) ? state : fallback;

	if (!navState || !id) return null;

	const index = navState.items.findIndex((item) => item.id === id);
	if (index === -1) return null;

	const prev = index > 0 ? navState.items[index - 1] : null;
	const next = index < navState.items.length - 1 ? navState.items[index + 1] : null;

	if (!prev && !next) return null;

	return (
		<nav className="DetailNav" aria-label="Previous and next items">
			{prev ? (
				<Link to={`${navState.basePath}/${prev.id}`} state={navState} className="DetailNav-prev" viewTransition>
					&larr; {prev.name}
				</Link>
			) : (
				<span />
			)}
			{next ? (
				<Link to={`${navState.basePath}/${next.id}`} state={navState} className="DetailNav-next" viewTransition>
					{next.name} &rarr;
				</Link>
			) : (
				<span />
			)}
		</nav>
	);
}

export default DetailNav;
