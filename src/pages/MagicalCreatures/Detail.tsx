import { useLocation, useParams } from "react-router";
import DetailNav from "../../lib/components/DetailNav";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import ErrorDisplay from "../../lib/components/ErrorDisplay";
import { Monster, Paw } from "../../lib/components/icons";
import { useMagicalCreature, useMagicalCreatures } from "../../lib/hooks/use-magical-creatures";
import { isDetailNavState } from "../../lib/models/detail-nav";

/** Detail page for a single magical creature, showing classification, status, and description. */
function MagicalCreatureDetail() {
	const { id } = useParams();
	const { state } = useLocation();
	const hasNavState = isDetailNavState(state);
	const { creature, isLoading, error, refetchAsync } = useMagicalCreature(id!);
	const { navState } = useMagicalCreatures({ skip: hasNavState });

	if (isLoading) return <DetailSkeleton rows={4} />;
	if (error)
		return (
			<ErrorDisplay entity="creature" status={error.status} statusText={error.statusText} onRetry={refetchAsync} />
		);
	if (!creature) return <p>Creature not found.</p>;

	return (
		<article className="DetailPage">
			<header>
				<Paw className="big" />
				<hgroup>
					<h1 style={{ viewTransitionName: `creature-${creature.id}` }}>{creature.name ?? "Unknown creature"}</h1>
				</hgroup>
			</header>

			<section>
				<h2>Details</h2>
				<dl>
					<dt>Classification</dt>
					<dd>
						<Paw /> {creature.classification}
					</dd>
					<dt>Dangerousness</dt>
					<dd>
						<Monster /> {creature.dangerousnessLevel}
					</dd>
					<dt>Status</dt>
					<dd>{creature.status}</dd>
					{creature.nativeTo && (
						<>
							<dt>Native to</dt>
							<dd>{creature.nativeTo}</dd>
						</>
					)}
				</dl>
			</section>

			{creature.description && (
				<section>
					<h2>Description</h2>
					<p>{creature.description}</p>
				</section>
			)}

			<DetailNav fallback={navState} />
		</article>
	);
}

export default MagicalCreatureDetail;
