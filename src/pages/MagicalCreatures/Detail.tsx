import { useParams } from "react-router";

function MagicalCreatureDetail() {
	const { id } = useParams();

	return <>MagicalCreature detail {id}</>;
}

export default MagicalCreatureDetail;
