import { Link } from "react-router";
import { getCardColor } from "../colors";
import type { DetailNavState } from "../models/detail-nav";
import type { Elixir } from "../models/elixir";
import { Hourglass, Monster, Potion } from "./icons";

type ElixirCardProps = {
	elixir: Elixir;
	navState?: DetailNavState;
};

/** Card for a single elixir, shown in the grid on the elixirs index page. */
function ElixirCard({ elixir, navState }: ElixirCardProps) {
	return (
		<Link to={`/elixirs/${elixir.id}`} state={navState} data-card className="ElixirCard" viewTransition>
			<header>
				<Potion className="big" style={{ color: getCardColor(elixir.id) }} />
				<hgroup>
					<h3 style={{ viewTransitionName: `elixir-${elixir.id}` }}>{elixir.name}</h3>
					<small>{elixir.manufacturer ?? "Unknown manufacturer"}</small>
				</hgroup>
			</header>
			<main>{elixir.characteristics ?? "No notable characteristics"}</main>
			<footer className="icon-group ">
				<span>
					<Monster /> {elixir.difficulty}
				</span>
				<span>
					<Hourglass />
					{elixir.time ?? "??:??"}
				</span>
			</footer>
		</Link>
	);
}

export default ElixirCard;
