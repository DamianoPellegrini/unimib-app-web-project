import React from "react";
import CardSkeleton from "../../lib/components/CardSkeleton";
import ErrorDisplay from "../../lib/components/ErrorDisplay";
import SpellCard from "../../lib/components/SpellCard";
import ViewToggle, { type ViewMode } from "../../lib/components/ViewToggle";
import { Wand } from "../../lib/components/icons";
import { useSpells } from "../../lib/hooks/use-spells";

const SKELETON_COUNT = 6;

/** Index page that lists all spells with a text search input. */
function SpellsIndex() {
	const [search, setSearch] = React.useState("");
	const [view, setView] = React.useState<ViewMode>("grid");
	const { spells, navState, isLoading, error, refetchAsync } = useSpells({
		textSearch: search,
	});

	return (
		<>
			<header>
				<Wand className="big" />
				<hgroup>
					<h1>Spells</h1>
					<p>Swish, flick, and say the magic words!</p>
				</hgroup>
			</header>
			<p>
				It's not just about waving your wand around — pronunciation matters! (Just ask Hermione.) Whether you need to
				unlock a door, summon your broomstick, or light up a dark corridor, there's a spell for that. Flip through the
				pages and practise your wand technique.
			</p>
			<section>
				<h2>Available information</h2>
				<div className="search-bar">
					<search>
						<input type="text" placeholder="Search spells..." onInput={(e) => setSearch(e.currentTarget.value)} />
					</search>
					<ViewToggle view={view} onViewChange={setView} />
				</div>
				{error && (
					<ErrorDisplay entity="spells" status={error.status} statusText={error.statusText} onRetry={refetchAsync} />
				)}
				{isLoading && (
					<ul {...{ [`data-${view}`]: true }}>
						{Array.from({ length: SKELETON_COUNT }, (_, i) => (
							<CardSkeleton key={i} subtitle body footer />
						))}
					</ul>
				)}
				{spells && spells.length === 0 && (
					<div data-empty>
						<p>No spells found.</p>
					</div>
				)}
				{spells && spells.length > 0 && (
					<ul {...{ [`data-${view}`]: true }}>
						{spells.map((spell) => (
							<data key={spell.id} value={spell.id}>
								<SpellCard spell={spell} navState={navState} />
							</data>
						))}
					</ul>
				)}
			</section>
		</>
	);
}

export default SpellsIndex;
