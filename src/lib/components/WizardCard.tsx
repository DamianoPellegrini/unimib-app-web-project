import { Link } from "react-router";
import { getCardColor } from "../colors";
import type { DetailNavState } from "../models/detail-nav";
import type { Wizard } from "../models/wizard";
import { Hat } from "./icons";

type WizardCardProps = {
	wizard: Wizard;
	navState?: DetailNavState;
};

/** Card for a single wizard, shown in the grid on the wizards index page. */
function WizardCard({ wizard, navState }: WizardCardProps) {
	const displayName = [wizard.firstName, wizard.lastName].filter(Boolean).join(" ") || "Unknown wizard";

	return (
		<Link to={`/wizards/${wizard.id}`} state={navState} data-card className="WizardCard" viewTransition>
			<header>
				<Hat className="big" style={{ color: getCardColor(wizard.id) }} />
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
