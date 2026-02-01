import { Link } from "react-router";
import type { Spell } from "../models/spell";
import { getSpellColor } from "../colors";
import { Wand } from "./icons";

type SpellCardProps = {
	spell: Spell;
};

function SpellCard({ spell }: SpellCardProps) {
	return (
		<Link to={`/spells/${spell.id}`} data-card className="SpellCard" viewTransition>
			<header>
				<Wand className="big" style={{ color: getSpellColor(spell.light) }} />
				<hgroup>
					<h3 style={{ viewTransitionName: `spell-${spell.id}` }}>{spell.name}</h3>
					<small>{spell.incantation ?? "No incantation"}</small>
				</hgroup>
			</header>
			<main>{spell.effect ?? "No known effect"}</main>
			<footer className="icon-group">
				<span>{spell.type}</span>
				<span>{spell.light !== "None" ? spell.light : ""}</span>
			</footer>
		</Link>
	);
}

export default SpellCard;
