import React from "react";
import ElixirCard from "../../lib/components/ElixirCard";
import { useElixirs } from "../../lib/hooks/use-elixirs";

function ElixirsIndex() {
	const [search, setSearch] = React.useState("");
	const { elixirs, isLoading, refetchAsync } = useElixirs({
		textSearch: search,
	});

	return (
		<>
			<header>
				<hgroup>
					<h1>Elixirs</h1>
					<p>Magical Potions & Brews</p>
				</hgroup>
			</header>
			<p>
				The art of potion-making requires precision, patience, and a deep understanding of magical ingredients. Within
				this chapter, you shall find a comprehensive catalogue of elixirs, from common remedies to the most complex
				concoctions known to wizardkind.
			</p>
			<section>
				<h2>Available information</h2>

				<search>
					<input type="text" placeholder="Search..." onInput={(e) => setSearch(e.currentTarget.value)} />
				</search>
				<button onClick={refetchAsync}>Reload</button>
				{isLoading && <p>Loading...</p>}
				{elixirs && (
					<ul data-grid>
						{elixirs.map((elixir) => (
							<data key={elixir.id} value={elixir.id}>
								<ElixirCard elixir={elixir} />
							</data>
						))}
					</ul>
				)}
			</section>
		</>
	);
}

export default ElixirsIndex;
