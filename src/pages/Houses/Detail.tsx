import { useParams } from "react-router";

function HouseDetail() {
	const { id } = useParams();

	return <>House detail {id}</>;
}

export default HouseDetail;
