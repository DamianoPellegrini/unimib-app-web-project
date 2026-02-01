import { Link, useParams } from "react-router";
import DetailSkeleton from "../../lib/components/DetailSkeleton";
import { Hourglass, Monster, Potion } from "../../lib/components/icons";
import { useElixir } from "../../lib/hooks/use-elixirs";

function ElixirDetail() {
	const { id } = useParams();
	const { elixir, isLoading, error, refetchAsync } = useElixir(id!);

	if (isLoading) return <DetailSkeleton rows={4} />;
	if (error)
		return (
			<div data-error>
				<p>Failed to load elixir.</p>
				<button onClick={refetchAsync}>Retry</button>
			</div>
		);
	if (!elixir) return <p>Elixir not found.</p>;

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
								<Link to={`/ingredients/${ingredient.id}`} viewTransition>
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
								<Link to={`/wizards/${inventor.id}`} viewTransition>
									{[inventor.firstName, inventor.lastName].filter(Boolean).join(" ")}
								</Link>
							</li>
						))}
					</ul>
				</section>
			)}
		</article>
	);
}

export default ElixirDetail;
