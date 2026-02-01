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
			<div className="wood-swatch">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div className="paper-swatch">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<main>
				<Outlet />
			</main>

			<footer>
				<small>© Hogwarts Compendium — interface inspired by old spellbooks</small>
			</footer>
		</>
	);
}

export default AppLayout;
