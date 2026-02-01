import { Link } from "react-router";
import type { DetailNavState } from "../models/detail-nav";
import type { Wizard } from "../models/wizard";
import { Hat } from "./icons";

type WizardCardProps = {
	wizard: Wizard;
	navState?: DetailNavState;
};

/** Palette of pastel oklch colours assigned to wizard cards based on their id. */
const COLORS = [
	"oklch(0.8 0.08 289.56)", // purple
	"oklch(0.8 0.08 247.55)", // blue
	"oklch(0.8 0.08 0)", // red
	"oklch(0.8 0.08 158.87)", // green
	"oklch(0.8 0.08 89.03)", // yellow
	"oklch(0.8 0.08 322.84)", // pink
	"oklch(0.8 0.08 212.23)", // teal
];

/** Card for a single wizard, shown in the grid on the wizards index page. */
function WizardCard({ wizard, navState }: WizardCardProps) {
	const displayName = [wizard.firstName, wizard.lastName].filter(Boolean).join(" ") || "Unknown wizard";

	return (
		<Link to={`/wizards/${wizard.id}`} state={navState} data-card className="WizardCard" viewTransition>
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
