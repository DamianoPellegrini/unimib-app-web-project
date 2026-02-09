import React from "react";
import CardSkeleton from "../../lib/components/CardSkeleton";
import ElixirCard from "../../lib/components/ElixirCard";
import ErrorDisplay from "../../lib/components/ErrorDisplay";
import ViewToggle, { type ViewMode } from "../../lib/components/ViewToggle";
import { Potion } from "../../lib/components/icons";
import { useElixirs } from "../../lib/hooks/use-elixirs";

const SKELETON_COUNT = 6;

/** Index page that lists all elixirs with a text search input. */
function ElixirsIndex() {
	const [search, setSearch] = React.useState("");
	const [view, setView] = React.useState<ViewMode>("grid");
	const { elixirs, navState, isLoading, error, refetchAsync } = useElixirs({
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

				<div className="search-bar">
					<search>
						<input type="text" placeholder="Search elixirs..." onInput={(e) => setSearch(e.currentTarget.value)} />
					</search>
					<ViewToggle view={view} onViewChange={setView} />
				</div>
				{error && (
					<ErrorDisplay entity="elixirs" status={error.status} statusText={error.statusText} onRetry={refetchAsync} />
				)}
				{isLoading && (
					<ul {...{ [`data-${view}`]: true }}>
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
					<ul {...{ [`data-${view}`]: true }}>
						{elixirs.map((elixir) => (
							<data key={elixir.id} value={elixir.id}>
								<ElixirCard elixir={elixir} navState={navState} />
							</data>
						))}
					</ul>
				)}
			</section>
		</>
	);
}

export default ElixirsIndex;
