import React from "react";
import { Outlet, NavLink } from "react-router";
import { Close, Menu } from "../lib/components/icons";
import { SECTIONS } from "../lib/constants";

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
						{menuOpen ? <Close width="24" height="24" /> : <Menu width="24" height="24" />}
					</button>
					<menu data-open={menuOpen || undefined}>
						<li>
							<NavLink to="/" end onClick={() => setMenuOpen(false)} viewTransition>
								Introduction
							</NavLink>
						</li>
						{SECTIONS.map(({ to, label }) => (
							<li key={to}>
								<NavLink to={to} onClick={() => setMenuOpen(false)} viewTransition>
									{label}
								</NavLink>
							</li>
						))}
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
