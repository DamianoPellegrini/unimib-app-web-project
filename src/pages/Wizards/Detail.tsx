import { useParams } from "react-router";

function WizardDetail() {
	const { id } = useParams();

	return <>Wizard detail {id}</>;
}

export default WizardDetail;
