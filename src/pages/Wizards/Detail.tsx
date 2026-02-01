import { Link, useParams } from "react-router";
import DetailNav from "../../lib/components/DetailNav";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import ErrorDisplay from "../../lib/components/ErrorDisplay";
import { Hat } from "../../lib/components/icons";
import { useWizard } from "../../lib/hooks/use-wizards";
import type { DetailNavState } from "../../lib/models/detail-nav";

/** Detail page for a single wizard, showing their known elixirs. */
function WizardDetail() {
	const { id } = useParams();
	const { wizard, isLoading, error, refetchAsync } = useWizard(id!);

	if (isLoading) return <DetailSkeleton rows={2} />;
	if (error)
		return <ErrorDisplay entity="wizard" status={error.status} statusText={error.statusText} onRetry={refetchAsync} />;
	if (!wizard) return <p>Wizard not found.</p>;

	const displayName = [wizard.firstName, wizard.lastName].filter(Boolean).join(" ") || "Unknown wizard";

	const elixirNav: DetailNavState | undefined =
		wizard.elixirs.length > 0
			? { basePath: "/elixirs", items: wizard.elixirs.map((e) => ({ id: e.id, name: e.name ?? "Unknown elixir" })) }
			: undefined;

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
								<Link to={`/elixirs/${elixir.id}`} state={elixirNav} viewTransition>
									{elixir.name}
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}

			<DetailNav />
		</article>
	);
}

export default WizardDetail;
