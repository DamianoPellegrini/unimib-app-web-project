import React from "react";
import { Outlet, NavLink } from "react-router";

/** Root layout rendered around every route. Contains the navbar, main outlet, and footer. */
function AppLayout() {
	const [menuOpen, setMenuOpen] = React.useState(false);

	return (
		<>
			<header>
				<nav>
					<button
						className="nav-toggle"
						aria-expanded={menuOpen}
						aria-label="Toggle navigation"
						onClick={() => setMenuOpen((v) => !v)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
							{menuOpen ? (
								<path
									fillRule="evenodd"
									d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
									clipRule="evenodd"
								/>
							) : (
								<path
									fillRule="evenodd"
									d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
									clipRule="evenodd"
								/>
							)}
						</svg>
					</button>
					<menu data-open={menuOpen || undefined}>
						<li>
							<NavLink to="/" end onClick={() => setMenuOpen(false)} viewTransition>
								Introduction
							</NavLink>
						</li>
						<li>
							<NavLink to="/elixirs" onClick={() => setMenuOpen(false)} viewTransition>
								Elixirs
							</NavLink>
						</li>
						<li>
							<NavLink to="/houses" onClick={() => setMenuOpen(false)} viewTransition>
								Houses
							</NavLink>
						</li>
						<li>
							<NavLink to="/ingredients" onClick={() => setMenuOpen(false)} viewTransition>
								Ingredients
							</NavLink>
						</li>
						<li>
							<NavLink to="/magical-creatures" onClick={() => setMenuOpen(false)} viewTransition>
								Magical Creatures
							</NavLink>
						</li>
						<li>
							<NavLink to="/spells" onClick={() => setMenuOpen(false)} viewTransition>
								Spells
							</NavLink>
						</li>
						<li>
							<NavLink to="/wizards" onClick={() => setMenuOpen(false)} viewTransition>
								Wizards
							</NavLink>
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
