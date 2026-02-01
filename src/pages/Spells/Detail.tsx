import { useParams } from "react-router";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import { getSpellColor } from "../../lib/colors";
import { Wand } from "../../lib/components/icons";
import { useSpell } from "../../lib/hooks/use-spells";

function SpellDetail() {
	const { id } = useParams();
	const { spell, isLoading, error, refetchAsync } = useSpell(id!);

	if (isLoading) return <DetailSkeleton rows={4} />;
	if (error)
		return (
			<div data-error>
				<p>Failed to load spell.</p>
				<button onClick={refetchAsync}>Retry</button>
			</div>
		);
	if (!spell) return <p>Spell not found.</p>;

	return (
		<article className="DetailPage">
			<header>
				<Wand className="big" style={{ color: getSpellColor(spell.light) }} />
				<hgroup>
					<h1 style={{ viewTransitionName: `spell-${spell.id}` }}>{spell.name}</h1>
					<p>{spell.incantation ?? "No incantation"}</p>
				</hgroup>
			</header>

			<section>
				<h2>Details</h2>
				<dl>
					<dt>Type</dt>
					<dd>{spell.type}</dd>
					<dt>Light</dt>
					<dd>{spell.light !== "None" ? spell.light : "No visible light"}</dd>
					{spell.effect && (
						<>
							<dt>Effect</dt>
							<dd>{spell.effect}</dd>
						</>
					)}
					{spell.canBeVerbal !== undefined && (
						<>
							<dt>Can be verbal</dt>
							<dd>{spell.canBeVerbal ? "Yes" : "No"}</dd>
						</>
					)}
					{spell.creator && (
						<>
							<dt>Creator</dt>
							<dd>{spell.creator}</dd>
						</>
					)}
				</dl>
			</section>
		</article>
	);
}

export default SpellDetail;
