import { Outlet, Link } from "react-router";

function AppLayout() {
	return (
		<>
			<header>
				<nav>
					<menu>
						<li>
							<Link to="/">Introduction</Link>
						</li>
						<li>
							<Link to="/elixirs">Elixirs</Link>
						</li>
						<li>
							<Link to="/houses">Houses</Link>
						</li>
						<li>
							<Link to="/ingredients">Ingredients</Link>
						</li>
						<li>
							<Link to="/magical-creatures">Magical Creatures</Link>
						</li>
						<li>
							<Link to="/spells">Spells</Link>
						</li>
						<li>
							<Link to="/wizards">Wizards</Link>
						</li>
					</menu>
				</nav>
			</header>

			<main>
				<Outlet />
			</main>

			<footer>
				<small>&copy; Hogwarts Compendium &mdash; interface inspired by old spellbooks</small>
				<small>
					Data provided by{" "}
					<a href="https://wizard-world-api.herokuapp.com" target="_blank" rel="noopener noreferrer">
						Wizard World API
					</a>{" "}
					&mdash;{" "}
					<a href="https://github.com/MossPiglets/WizardWorldAPI" target="_blank" rel="noopener noreferrer">
						GitHub
					</a>
				</small>
			</footer>
		</>
	);
}

export default AppLayout;
