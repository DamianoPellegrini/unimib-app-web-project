import { useParams } from "react-router";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import { Monster, Paw } from "../../lib/components/icons";
import { useMagicalCreature } from "../../lib/hooks/use-magical-creatures";

function MagicalCreatureDetail() {
	const { id } = useParams();
	const { creature, isLoading, error, refetchAsync } = useMagicalCreature(id!);

	if (isLoading) return <DetailSkeleton rows={4} />;
	if (error)
		return (
			<div data-error>
				<p>Failed to load creature.</p>
				<button onClick={refetchAsync}>Retry</button>
			</div>
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
		</article>
	);
}

export default MagicalCreatureDetail;
