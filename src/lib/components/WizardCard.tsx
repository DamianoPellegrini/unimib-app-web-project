import { Link } from "react-router";
import type { Wizard } from "../models/wizard";
import { Hat } from "./icons";

type WizardCardProps = {
	wizard: Wizard;
};

const COLORS = [
	"oklch(0.8 0.08 289.56)", // purple
	"oklch(0.8 0.08 247.55)", // blue
	"oklch(0.8 0.08 0)", // red
	"oklch(0.8 0.08 158.87)", // green
	"oklch(0.8 0.08 89.03)", // yellow
	"oklch(0.8 0.08 322.84)", // pink
	"oklch(0.8 0.08 212.23)", // teal
];

function WizardCard({ wizard }: WizardCardProps) {
	const displayName = [wizard.firstName, wizard.lastName].filter(Boolean).join(" ") || "Unknown wizard";

	return (
		<Link to={`/wizards/${wizard.id}`} data-card className="WizardCard" viewTransition>
			<header>
				<Hat className="big" style={{ color: COLORS[(wizard.id.charCodeAt(0) * 10) % COLORS.length] }} />
				<hgroup>
					<h3 style={{ viewTransitionName: `wizard-${wizard.id}` }}>{displayName}</h3>
					<small>
						{wizard.elixirs.length > 0
							? `${wizard.elixirs.length} elixir${wizard.elixirs.length > 1 ? "s" : ""}`
							: "No known elixirs"}
					</small>
				</hgroup>
			</header>
		</Link>
	);
}

export default WizardCard;
