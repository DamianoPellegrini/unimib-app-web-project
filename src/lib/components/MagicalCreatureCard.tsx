import { Link } from "react-router";
import type { MagicalCreature } from "../models/magical-creature";
import { Monster, Paw } from "./icons";

type MagicalCreatureCardProps = {
	creature: MagicalCreature;
};

const COLORS = [
	"oklch(0.8 0.08 89.03)", // yellow
	"oklch(0.8 0.08 0)", // red
	"oklch(0.8 0.08 158.87)", // green
	"oklch(0.8 0.08 247.55)", // blue
	"oklch(0.8 0.08 289.56)", // purple
	"oklch(0.8 0.08 322.84)", // pink
	"oklch(0.8 0.08 212.23)", // teal
];

function MagicalCreatureCard({ creature }: MagicalCreatureCardProps) {
	return (
		<Link to={`/magical-creatures/${creature.id}`} data-card className="MagicalCreatureCard" viewTransition>
			<header>
				<Paw className="big" style={{ color: COLORS[(creature.id.charCodeAt(0) * 10) % COLORS.length] }} />
				<hgroup>
					<h3 style={{ viewTransitionName: `creature-${creature.id}` }}>
						{creature.name ?? "Unknown creature"}
					</h3>
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
