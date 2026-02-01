import { Outlet, NavLink } from "react-router";

function AppLayout() {
	return (
		<>
			<header>
				<nav>
					<menu>
						<li>
							<NavLink to="/" end>
								Introduction
							</NavLink>
						</li>
						<li>
							<NavLink to="/elixirs">Elixirs</NavLink>
						</li>
						<li>
							<NavLink to="/houses">Houses</NavLink>
						</li>
						<li>
							<NavLink to="/ingredients">Ingredients</NavLink>
						</li>
						<li>
							<NavLink to="/magical-creatures">Magical Creatures</NavLink>
						</li>
						<li>
							<NavLink to="/spells">Spells</NavLink>
						</li>
						<li>
							<NavLink to="/wizards">Wizards</NavLink>
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
