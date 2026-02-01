import React from "react";
import CardSkeleton from "../../lib/components/CardSkeleton";
import HouseCard from "../../lib/components/HouseCard";
import { Shield } from "../../lib/components/icons";
import { useHouses } from "../../lib/hooks/use-houses";

const SKELETON_COUNT = 4;

function HousesIndex() {
	const [search, setSearch] = React.useState("");
	const { houses, isLoading, error, refetchAsync } = useHouses({
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
				<search>
					<input type="text" placeholder="Search houses..." onInput={(e) => setSearch(e.currentTarget.value)} />
				</search>
				{error && (
					<div data-error>
						<p>Failed to load houses.</p>
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
				{houses && houses.length === 0 && (
					<div data-empty>
						<p>No houses found.</p>
					</div>
				)}
				{houses && houses.length > 0 && (
					<ul data-grid>
						{houses.map((house) => (
							<data key={house.id} value={house.id}>
								<HouseCard house={house} />
							</data>
						))}
					</ul>
				)}
			</section>
		</>
	);
}

export default HousesIndex;
