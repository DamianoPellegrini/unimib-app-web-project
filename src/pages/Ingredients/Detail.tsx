import { useLocation, useParams } from "react-router";
import DetailNav from "../../lib/components/DetailNav";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import ErrorDisplay from "../../lib/components/ErrorDisplay";
import { Leaf } from "../../lib/components/icons";
import { useIngredient, useIngredients } from "../../lib/hooks/use-ingredients";
import { isDetailNavState } from "../../lib/models/detail-nav";

/** Detail page for a single ingredient. */
function IngredientDetail() {
	const { id } = useParams();
	const { state } = useLocation();
	const hasNavState = isDetailNavState(state);
	const { ingredient, isLoading, error, refetchAsync } = useIngredient(id!);
	const { navState } = useIngredients({ skip: hasNavState });

	if (isLoading) return <DetailSkeleton rows={1} />;
	if (error)
		return (
			<ErrorDisplay entity="ingredient" status={error.status} statusText={error.statusText} onRetry={refetchAsync} />
		);
	if (!ingredient) return <p>Ingredient not found.</p>;

	return (
		<article className="DetailPage">
			<header>
				<Leaf className="big" />
				<hgroup>
					<h1 style={{ viewTransitionName: `ingredient-${ingredient.id}` }}>
						{ingredient.name ?? "Unknown ingredient"}
					</h1>
				</hgroup>
			</header>

			<DetailNav fallback={navState} />
		</article>
	);
}

export default IngredientDetail;
