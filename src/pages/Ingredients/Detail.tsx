import { useParams } from "react-router";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import { Leaf } from "../../lib/components/icons";
import { useIngredient } from "../../lib/hooks/use-ingredients";

function IngredientDetail() {
	const { id } = useParams();
	const { ingredient, isLoading, error, refetchAsync } = useIngredient(id!);

	if (isLoading) return <DetailSkeleton rows={1} />;
	if (error)
		return (
			<div data-error>
				<p>Failed to load ingredient.</p>
				<button onClick={refetchAsync}>Retry</button>
			</div>
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
		</article>
	);
}

export default IngredientDetail;
