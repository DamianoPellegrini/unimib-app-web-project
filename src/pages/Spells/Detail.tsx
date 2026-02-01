import { useLocation, useParams } from "react-router";
import DetailNav from "../../lib/components/DetailNav";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import ErrorDisplay from "../../lib/components/ErrorDisplay";
import { getSpellColor } from "../../lib/colors";
import { Wand } from "../../lib/components/icons";
import { useSpell, useSpells } from "../../lib/hooks/use-spells";
import { isDetailNavState } from "../../lib/models/detail-nav";

/** Detail page for a single spell, showing type, light, effect, and creator. */
function SpellDetail() {
	const { id } = useParams();
	const { state } = useLocation();
	const hasNavState = isDetailNavState(state);
	const { spell, isLoading, error, refetchAsync } = useSpell(id!);
	const { navState } = useSpells({ skip: hasNavState });

	if (isLoading) return <DetailSkeleton rows={4} />;
	if (error)
		return <ErrorDisplay entity="spell" status={error.status} statusText={error.statusText} onRetry={refetchAsync} />;
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

			<DetailNav fallback={navState} />
		</article>
	);
}

export default SpellDetail;
