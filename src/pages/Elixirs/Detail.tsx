import { Link, useParams } from "react-router";
import DetailNav from "../../lib/components/DetailNav";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import ErrorDisplay from "../../lib/components/ErrorDisplay";
import { Hourglass, Monster, Potion } from "../../lib/components/icons";
import { useElixir } from "../../lib/hooks/use-elixirs";
import type { DetailNavState } from "../../lib/models/detail-nav";

/** Detail page for a single elixir, showing properties, ingredients, and inventors. */
function ElixirDetail() {
	const { id } = useParams();
	const { elixir, isLoading, error, refetchAsync } = useElixir(id!);

	if (isLoading) return <DetailSkeleton rows={4} />;
	if (error)
		return <ErrorDisplay entity="elixir" status={error.status} statusText={error.statusText} onRetry={refetchAsync} />;
	if (!elixir) return <p>Elixir not found.</p>;

	const ingredientNav: DetailNavState | undefined =
		elixir.ingredients && elixir.ingredients.length > 0
			? {
					basePath: "/ingredients",
					items: elixir.ingredients.map((i) => ({ id: i.id, name: i.name ?? "Unknown ingredient" })),
				}
			: undefined;

	const inventorNav: DetailNavState | undefined =
		elixir.inventors && elixir.inventors.length > 0
			? {
					basePath: "/wizards",
					items: elixir.inventors.map((i) => ({
						id: i.id,
						name: [i.firstName, i.lastName].filter(Boolean).join(" ") || "Unknown wizard",
					})),
				}
			: undefined;

	return (
		<article className="DetailPage">
			<header>
				<Potion className="big" />
				<hgroup>
					<h1 style={{ viewTransitionName: `elixir-${elixir.id}` }}>{elixir.name}</h1>
					<p>{elixir.manufacturer ?? "Unknown manufacturer"}</p>
				</hgroup>
			</header>

			<section>
				<h2>Properties</h2>
				<dl>
					<dt>Difficulty</dt>
					<dd>
						<Monster /> {elixir.difficulty}
					</dd>
					<dt>Brewing time</dt>
					<dd>
						<Hourglass /> {elixir.time ?? "Unknown"}
					</dd>
					{elixir.effect && (
						<>
							<dt>Effect</dt>
							<dd>{elixir.effect}</dd>
						</>
					)}
					{elixir.sideEffects && (
						<>
							<dt>Side effects</dt>
							<dd>{elixir.sideEffects}</dd>
						</>
					)}
					{elixir.characteristics && (
						<>
							<dt>Characteristics</dt>
							<dd>{elixir.characteristics}</dd>
						</>
					)}
				</dl>
			</section>

			{elixir.ingredients && elixir.ingredients.length > 0 && (
				<section>
					<h2>Ingredients</h2>
					<ul>
						{elixir.ingredients.map((ingredient) => (
							<li key={ingredient.id}>
								<Link to={`/ingredients/${ingredient.id}`} state={ingredientNav} viewTransition>
									{ingredient.name}
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}

			{elixir.inventors && elixir.inventors.length > 0 && (
				<section>
					<h2>Inventors</h2>
					<ul>
						{elixir.inventors.map((inventor) => (
							<li key={inventor.id}>
								<Link to={`/wizards/${inventor.id}`} state={inventorNav} viewTransition>
									{[inventor.firstName, inventor.lastName].filter(Boolean).join(" ")}
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

export default ElixirDetail;
