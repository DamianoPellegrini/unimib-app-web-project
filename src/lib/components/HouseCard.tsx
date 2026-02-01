import { Link } from "react-router";
import { getHouseColor } from "../colors";
import type { House } from "../models/house";
import { Shield } from "./icons";

type HouseCardProps = {
	house: House;
};

function HouseCard({ house }: HouseCardProps) {
	const color = getHouseColor(house.name);

	return (
		<Link to={`/houses/${house.id}`} data-card className="HouseCard" viewTransition>
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
