import { Link } from "react-router";
import { getCardColor } from "../colors";
import type { DetailNavState } from "../models/detail-nav";
import type { MagicalCreature } from "../models/magical-creature";
import { Monster, Paw } from "./icons";

type MagicalCreatureCardProps = {
	creature: MagicalCreature;
	navState?: DetailNavState;
};

/** Card for a single creature, shown in the grid on the magical creatures index page. */
function MagicalCreatureCard({ creature, navState }: MagicalCreatureCardProps) {
	return (
		<Link
			to={`/magical-creatures/${creature.id}`}
			state={navState}
			data-card
			className="MagicalCreatureCard"
			viewTransition
		>
			<header>
				<Paw className="big" style={{ color: getCardColor(creature.id) }} />
				<hgroup>
					<h3 style={{ viewTransitionName: `creature-${creature.id}` }}>{creature.name ?? "Unknown creature"}</h3>
				</hgroup>
			</header>
			<main>{creature.description || "No description available"}</main>
			<footer className="icon-group">
				<span>
					<Paw /> {creature.classification}
				</span>
				<span>
					<Monster /> {creature.dangerousnessLevel}
				</span>
			</footer>
		</Link>
	);
}

export default MagicalCreatureCard;
