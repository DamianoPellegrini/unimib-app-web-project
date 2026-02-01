import { Link } from "react-router";

function App() {
	return (
		<>
			<header>
				<hgroup>
					<h1>The Hogwarts Compendium</h1>
					<p role="heading" className="visually-hidden">
						A small compendium of the wizarding world — navigate using the bookmarks.
					</p>
				</hgroup>
			</header>
			<article>
				<p>
					Welcome to the Hogwarts Compendium — a small front-end to explore spells, houses, magical creatures, elixirs,
					ingredients and the wizards who use them. Use the bookmarks on the right to navigate.
				</p>
				<hr />
				<p>
					Quick links: <Link to="/elixirs">Elixirs</Link>
					{" • "}
					<Link to="/spells">Spells</Link>
				</p>
			</article>
		</>
	);
}

export default App;
