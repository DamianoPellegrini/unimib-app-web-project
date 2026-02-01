import { Link } from "react-router";
import { Hat, Leaf, Paw, Potion, Shield, Wand } from "../lib/components/icons";

const SECTIONS = [
	{
		to: "/elixirs",
		title: "Elixirs",
		description: "Potions, brews and magical concoctions catalogued by difficulty and brewing time.",
		icon: Potion,
	},
	{
		to: "/houses",
		title: "Houses",
		description: "The four Hogwarts houses, their founders, colours, animals and defining traits.",
		icon: Shield,
	},
	{
		to: "/spells",
		title: "Spells",
		description: "Charms, hexes, curses and incantations — from simple spells to dark arts.",
		icon: Wand,
	},
	{
		to: "/wizards",
		title: "Wizards",
		description: "Witches and wizards who have shaped the course of magical history.",
		icon: Hat,
	},
	{
		to: "/ingredients",
		title: "Ingredients",
		description: "Herbs, reagents and magical substances used in the art of potion-brewing.",
		icon: Leaf,
	},
	{
		to: "/magical-creatures",
		title: "Magical Creatures",
		description: "Beasts, beings and spirits classified by the Ministry of Magic.",
		icon: Paw,
	},
] as const;

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
					{SECTIONS.map(({ to, title, description, icon: Icon }) => (
						<li key={to}>
							<Link to={to} className="HomePage-card" viewTransition>
								<h3>
									<Icon /> {title}
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
