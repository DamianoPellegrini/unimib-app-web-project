import { useParams } from "react-router";

function IngredientDetail() {
	const { id } = useParams();

	return <>Ingredient detail {id}</>;
}

export default IngredientDetail;
