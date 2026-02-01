import React from "react";
import CardSkeleton from "../../lib/components/CardSkeleton";
import ElixirCard from "../../lib/components/ElixirCard";
import { Potion } from "../../lib/components/icons";
import { useElixirs } from "../../lib/hooks/use-elixirs";

const SKELETON_COUNT = 6;

function ElixirsIndex() {
	const [search, setSearch] = React.useState("");
	const { elixirs, isLoading, error, refetchAsync } = useElixirs({
		textSearch: search,
	});

	return (
		<>
			<header>
				<Potion className="big" />
				<hgroup>
					<h1>Elixirs</h1>
					<p>Bubbling cauldrons & bottled wonders</p>
				</hgroup>
			</header>
			<p>
				Stir clockwise, add a dash of moonstone, and hope for the best! From love potions that smell suspiciously like
				your favourite things to draughts that could put a giant to sleep — every great witch and wizard knows their way
				around a cauldron. Browse the shelves and see what catches your eye.
			</p>
			<section>
				<h2>Available information</h2>

				<search>
					<input type="text" placeholder="Search elixirs..." onInput={(e) => setSearch(e.currentTarget.value)} />
				</search>
				{error && (
					<div data-error>
						<p>Failed to load elixirs.</p>
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
				{elixirs && elixirs.length === 0 && (
					<div data-empty>
						<p>No elixirs found.</p>
					</div>
				)}
				{elixirs && elixirs.length > 0 && (
					<ul data-grid>
						{elixirs.map((elixir) => (
							<data key={elixir.id} value={elixir.id}>
								<ElixirCard elixir={elixir} />
							</data>
						))}
					</ul>
				)}
			</section>
		</>
	);
}

export default ElixirsIndex;
