import { useParams } from "react-router";
import { useElixir } from "../../lib/hooks/use-elixirs";

function ElixirDetail() {
	const { id } = useParams();
	const { elixir } = useElixir(id!);

	if (!elixir) {
		// TODO: not found
	}

	return (
		<>
			{JSON.stringify(elixir)} detail {id}
		</>
	);
}

export default ElixirDetail;
