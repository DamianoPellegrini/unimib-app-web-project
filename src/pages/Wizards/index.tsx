import React from "react";
import CardSkeleton from "../../lib/components/CardSkeleton";
import WizardCard from "../../lib/components/WizardCard";
import { Hat } from "../../lib/components/icons";
import { useWizards } from "../../lib/hooks/use-wizards";

const SKELETON_COUNT = 6;

function WizardsIndex() {
	const [search, setSearch] = React.useState("");
	const { wizards, isLoading, error, refetchAsync } = useWizards({
		textSearch: search,
	});

	return (
		<>
			<header>
				<Hat className="big" />
				<hgroup>
					<h1>Wizards</h1>
					<p>The famous (and infamous) faces of magic</p>
				</hgroup>
			</header>
			<p>
				From headmasters with peculiar candy obsessions to dark lords who really should have picked a better hobby — the
				wizarding world is full of unforgettable characters. Have a wander through this gallery and see who you
				recognise.
			</p>
			<section>
				<h2>Available information</h2>
				<search>
					<input type="text" placeholder="Search wizards..." onInput={(e) => setSearch(e.currentTarget.value)} />
				</search>
				{error && (
					<div data-error>
						<p>Failed to load wizards.</p>
						<button onClick={refetchAsync}>Retry</button>
					</div>
				)}
				{isLoading && (
					<ul data-grid>
						{Array.from({ length: SKELETON_COUNT }, (_, i) => (
							<CardSkeleton key={i} subtitle />
						))}
					</ul>
				)}
				{wizards && wizards.length === 0 && (
					<div data-empty>
						<p>No wizards found.</p>
					</div>
				)}
				{wizards && wizards.length > 0 && (
					<ul data-grid>
						{wizards.map((wizard) => (
							<data key={wizard.id} value={wizard.id}>
								<WizardCard wizard={wizard} />
							</data>
						))}
					</ul>
				)}
			</section>
		</>
	);
}

export default WizardsIndex;
