import { Link } from "react-router";
import { SECTIONS } from "../lib/constants";

/** Home page with an introduction and links to each entity section. */
function App() {
	return (
		<div className="HomePage">
			<header>
				<hgroup>
					<h1>The Hogwarts Compendium</h1>
					<p>
						A wizarding world reference — browse spells, houses, magical creatures, elixirs, ingredients and the wizards
						who wield them.
					</p>
				</hgroup>
			</header>

			<section>
				<h2>Explore</h2>
				<ul className="HomePage-grid">
					{SECTIONS.map(({ to, label, description, icon: Icon }) => (
						<li key={to}>
							<Link to={to} className="HomePage-card" viewTransition>
								<h3>
									<Icon /> {label}
								</h3>
								<p>{description}</p>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

export default App;
