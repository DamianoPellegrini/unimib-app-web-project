import { Link, useParams } from "react-router";
import { getHouseColor } from "../../lib/colors";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import { Shield } from "../../lib/components/icons";
import { useHouse } from "../../lib/hooks/use-houses";

function HouseDetail() {
	const { id } = useParams();
	const { house, isLoading, error, refetchAsync } = useHouse(id!);

	if (isLoading) return <DetailSkeleton rows={4} />;
	if (error)
		return (
			<div data-error>
				<p>Failed to load house.</p>
				<button onClick={refetchAsync}>Retry</button>
			</div>
		);
	if (!house) return <p>House not found.</p>;

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
								<Link to={`/wizards/${head.id}`} viewTransition>
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
		</article>
	);
}

export default HouseDetail;
