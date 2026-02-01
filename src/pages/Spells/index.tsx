import React from "react";
import CardSkeleton from "../../lib/components/CardSkeleton";
import SpellCard from "../../lib/components/SpellCard";
import { Wand } from "../../lib/components/icons";
import { useSpells } from "../../lib/hooks/use-spells";

const SKELETON_COUNT = 6;

function SpellsIndex() {
	const [search, setSearch] = React.useState("");
	const { spells, isLoading, error, refetchAsync } = useSpells({
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
				<search>
					<input type="text" placeholder="Search spells..." onInput={(e) => setSearch(e.currentTarget.value)} />
				</search>
				{error && (
					<div data-error>
						<p>Failed to load spells.</p>
						<button onClick={refetchAsync}>Retry</button>
					</div>
				)}
				{isLoading && (
					<ul data-grid>
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
					<ul data-grid>
						{spells.map((spell) => (
							<data key={spell.id} value={spell.id}>
								<SpellCard spell={spell} />
							</data>
						))}
					</ul>
				)}
			</section>
		</>
	);
}

export default SpellsIndex;
