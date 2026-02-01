import { Link, useParams } from "react-router";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import { Hat } from "../../lib/components/icons";
import { useWizard } from "../../lib/hooks/use-wizards";

function WizardDetail() {
	const { id } = useParams();
	const { wizard, isLoading, error, refetchAsync } = useWizard(id!);

	if (isLoading) return <DetailSkeleton rows={2} />;
	if (error)
		return (
			<div data-error>
				<p>Failed to load wizard.</p>
				<button onClick={refetchAsync}>Retry</button>
			</div>
		);
	if (!wizard) return <p>Wizard not found.</p>;

	const displayName = [wizard.firstName, wizard.lastName].filter(Boolean).join(" ") || "Unknown wizard";

	return (
		<article className="DetailPage">
			<header>
				<Hat className="big" />
				<hgroup>
					<h1 style={{ viewTransitionName: `wizard-${wizard.id}` }}>{displayName}</h1>
				</hgroup>
			</header>

			{wizard.elixirs.length > 0 && (
				<section>
					<h2>Known elixirs</h2>
					<ul>
						{wizard.elixirs.map((elixir) => (
							<li key={elixir.id}>
								<Link to={`/elixirs/${elixir.id}`} viewTransition>
									{elixir.name}
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}
		</article>
	);
}

export default WizardDetail;
