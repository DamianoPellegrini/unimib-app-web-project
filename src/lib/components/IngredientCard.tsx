import { Link } from "react-router";
import type { ElixirIngredient } from "../models/elixir";
import { Leaf } from "./icons";

type IngredientCardProps = {
	ingredient: ElixirIngredient;
};

const COLORS = [
	"oklch(0.8 0.08 158.87)", // green
	"oklch(0.8 0.08 89.03)", // yellow
	"oklch(0.8 0.08 212.23)", // teal
	"oklch(0.8 0.08 0)", // red
	"oklch(0.8 0.08 289.56)", // purple
];

function IngredientCard({ ingredient }: IngredientCardProps) {
	return (
		<Link to={`/ingredients/${ingredient.id}`} data-card className="IngredientCard" viewTransition>
			<header>
				<Leaf className="big" style={{ color: COLORS[(ingredient.id.charCodeAt(0) * 10) % COLORS.length] }} />
				<hgroup>
					<h3 style={{ viewTransitionName: `ingredient-${ingredient.id}` }}>
						{ingredient.name ?? "Unknown ingredient"}
					</h3>
				</hgroup>
			</header>
		</Link>
	);
}

export default IngredientCard;
