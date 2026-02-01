import { Link } from "react-router";
import type { DetailNavState } from "../models/detail-nav";
import type { Elixir } from "../models/elixir";
import { Hourglass, Monster, Potion } from "./icons";

type ElixirCardProps = {
	elixir: Elixir;
	navState?: DetailNavState;
};

/** Palette of pastel oklch colours assigned to elixir cards based on their id. */
const COLORS = [
	"oklch(0.8 0.08 0)",
	"oklch(0.8 0.08 289.56)",
	"oklch(0.8 0.08 89.03)",
	"oklch(0.8 0.08 247.55)", // blue
	"oklch(0.8 0.08 212.23)",
	"oklch(0.8 0.08 158.87)", // green
	"oklch(0.8 0.08 322.84)", // pink
];

/** Card for a single elixir, shown in the grid on the elixirs index page. */
function ElixirCard({ elixir, navState }: ElixirCardProps) {
	// if (!elixir.time) {
	// 	return null;
	// }
	return (
		<Link to={`/elixirs/${elixir.id}`} state={navState} data-card className="ElixirCard" viewTransition>
			<header>
				<Potion className="big" style={{ color: COLORS[(elixir.id.charCodeAt(0) * 10) % COLORS.length] }} />
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
