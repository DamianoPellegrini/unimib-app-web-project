import { Link } from "react-router";
import { getHouseColor } from "../colors";
import type { DetailNavState } from "../models/detail-nav";
import type { House } from "../models/house";
import { Shield } from "./icons";

type HouseCardProps = {
	house: House;
	navState?: DetailNavState;
};

/** Card for a single Hogwarts house, shown in the grid on the houses index page. */
function HouseCard({ house, navState }: HouseCardProps) {
	const color = getHouseColor(house.name);

	return (
		<Link to={`/houses/${house.id}`} state={navState} data-card className="HouseCard" viewTransition>
			<header>
				<Shield className="big" style={{ color }} />
				<hgroup>
					<h3 style={{ viewTransitionName: `house-${house.id}` }}>{house.name}</h3>
					<small>{house.founder ?? "Unknown founder"}</small>
				</hgroup>
			</header>
			<main>{house.houseColours ?? "No colours recorded"}</main>
			<footer className="icon-group">
				<span>{house.animal ?? "No animal"}</span>
				<span>{house.element ?? "No element"}</span>
			</footer>
		</Link>
	);
}

export default HouseCard;
