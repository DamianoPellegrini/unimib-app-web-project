import { useParams } from "react-router";

function SpellDetail() {
	const { id } = useParams();

	return <>Spell detail {id}</>;
}

export default SpellDetail;
