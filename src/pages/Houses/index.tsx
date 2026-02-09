import React from "react";
import CardSkeleton from "../../lib/components/CardSkeleton";
import ErrorDisplay from "../../lib/components/ErrorDisplay";
import HouseCard from "../../lib/components/HouseCard";
import ViewToggle, { type ViewMode } from "../../lib/components/ViewToggle";
import { Shield } from "../../lib/components/icons";
import { useHouses } from "../../lib/hooks/use-houses";

const SKELETON_COUNT = 4;

/** Index page that lists all Hogwarts houses with a text search input. */
function HousesIndex() {
	const [search, setSearch] = React.useState("");
	const [view, setView] = React.useState<ViewMode>("grid");
	const { houses, navState, isLoading, error, refetchAsync } = useHouses({
		textSearch: search,
	});

	return (
		<>
			<header>
				<Shield className="big" />
				<hgroup>
					<h1>Houses</h1>
					<p>Where will the Sorting Hat place you?</p>
				</hgroup>
			</header>
			<p>
				Brave, loyal, clever, or cunning — everyone fits somewhere! The Sorting Hat has been reading minds since the
				founders walked these halls, and it hasn't been wrong yet (well, almost never). Take a peek at the four houses
				and decide which common room you'd fancy calling home.
			</p>
			<section>
				<h2>Available information</h2>
				<div className="search-bar">
					<search>
						<input type="text" placeholder="Search houses..." onInput={(e) => setSearch(e.currentTarget.value)} />
					</search>
					<ViewToggle view={view} onViewChange={setView} />
				</div>
				{error && (
					<ErrorDisplay entity="houses" status={error.status} statusText={error.statusText} onRetry={refetchAsync} />
				)}
				{isLoading && (
					<ul {...{ [`data-${view}`]: true }}>
						{Array.from({ length: SKELETON_COUNT }, (_, i) => (
							<CardSkeleton key={i} subtitle body footer />
						))}
					</ul>
				)}
				{houses && houses.length === 0 && (
					<div data-empty>
						<p>No houses found.</p>
					</div>
				)}
				{houses && houses.length > 0 && (
					<ul {...{ [`data-${view}`]: true }}>
						{houses.map((house) => (
							<data key={house.id} value={house.id}>
								<HouseCard house={house} navState={navState} />
							</data>
						))}
					</ul>
				)}
			</section>
		</>
	);
}

export default HousesIndex;
