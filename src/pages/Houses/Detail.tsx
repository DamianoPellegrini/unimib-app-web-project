import { Link, useLocation, useParams } from "react-router";
import { getHouseColor } from "../../lib/colors";
import DetailNav from "../../lib/components/DetailNav";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import ErrorDisplay from "../../lib/components/ErrorDisplay";
import { Shield } from "../../lib/components/icons";
import { useHouse, useHouses } from "../../lib/hooks/use-houses";
import { isDetailNavState } from "../../lib/models/detail-nav";
import type { DetailNavState } from "../../lib/models/detail-nav";

/** Detail page for a single Hogwarts house, showing traits, heads, and house info. */
function HouseDetail() {
	const { id } = useParams();
	const { state } = useLocation();
	const hasNavState = isDetailNavState(state);
	const { house, isLoading, error, refetchAsync } = useHouse(id!);
	const { navState } = useHouses({ skip: hasNavState });

	if (isLoading) return <DetailSkeleton rows={4} />;
	if (error)
		return <ErrorDisplay entity="house" status={error.status} statusText={error.statusText} onRetry={refetchAsync} />;
	if (!house) return <p>House not found.</p>;

	const headNav: DetailNavState | undefined =
		house.heads && house.heads.length > 0
			? {
					basePath: "/wizards",
					items: house.heads.map((h) => ({
						id: h.id,
						name: [h.firstName, h.lastName].filter(Boolean).join(" ") || "Unknown wizard",
					})),
				}
			: undefined;

	return (
		<article className="DetailPage">
			<header>
				<Shield className="big" style={{ color: getHouseColor(house.name) }} />
				<hgroup>
					<h1 style={{ viewTransitionName: `house-${house.id}` }}>{house.name}</h1>
					<p>Founded by {house.founder ?? "Unknown"}</p>
				</hgroup>
			</header>

			<section>
				<h2>Details</h2>
				<dl>
					{house.houseColours && (
						<>
							<dt>Colours</dt>
							<dd>{house.houseColours}</dd>
						</>
					)}
					{house.animal && (
						<>
							<dt>Animal</dt>
							<dd>{house.animal}</dd>
						</>
					)}
					{house.element && (
						<>
							<dt>Element</dt>
							<dd>{house.element}</dd>
						</>
					)}
					{house.ghost && (
						<>
							<dt>Ghost</dt>
							<dd>{house.ghost}</dd>
						</>
					)}
					{house.commonRoom && (
						<>
							<dt>Common room</dt>
							<dd>{house.commonRoom}</dd>
						</>
					)}
				</dl>
			</section>

			{house.heads && house.heads.length > 0 && (
				<section>
					<h2>Heads of House</h2>
					<ul>
						{house.heads.map((head) => (
							<li key={head.id}>
								<Link to={`/wizards/${head.id}`} state={headNav} viewTransition>
									{[head.firstName, head.lastName].filter(Boolean).join(" ")}
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}

			{house.traits && house.traits.length > 0 && (
				<section>
					<h2>Traits</h2>
					<ul>
						{house.traits.map((trait) => (
							<li key={trait.id}>{trait.name}</li>
						))}
					</ul>
				</section>
			)}

			<DetailNav fallback={navState} />
		</article>
	);
}

export default HouseDetail;
