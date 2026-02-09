import { Link } from "react-router";
import { getCardColor } from "../colors";
import type { DetailNavState } from "../models/detail-nav";
import type { ElixirIngredient } from "../models/elixir";
import { Leaf } from "./icons";

type IngredientCardProps = {
	ingredient: ElixirIngredient;
	navState?: DetailNavState;
};

/** Card for a single ingredient, shown in the grid on the ingredients index page. */
function IngredientCard({ ingredient, navState }: IngredientCardProps) {
	return (
		<Link to={`/ingredients/${ingredient.id}`} state={navState} data-card className="IngredientCard" viewTransition>
			<header>
				<Leaf className="big" style={{ color: getCardColor(ingredient.id) }} />
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
