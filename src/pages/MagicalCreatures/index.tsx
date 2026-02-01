import React from "react";
import CardSkeleton from "../../lib/components/CardSkeleton";
import ErrorDisplay from "../../lib/components/ErrorDisplay";
import MagicalCreatureCard from "../../lib/components/MagicalCreatureCard";
import { Paw } from "../../lib/components/icons";
import { useMagicalCreatures } from "../../lib/hooks/use-magical-creatures";

const SKELETON_COUNT = 6;

/** Index page that lists all magical creatures with a text search input. */
function MagicalCreaturesIndex() {
	const [search, setSearch] = React.useState("");
	const { creatures, navState, isLoading, error, refetchAsync } = useMagicalCreatures({
		textSearch: search,
	});

	return (
		<>
			<header>
				<Paw className="big" />
				<hgroup>
					<h1>Magical Creatures</h1>
					<p>Fluffy, scaly, and absolutely not safe as pets</p>
				</hgroup>
			</header>
			<p>
				Hagrid would disagree, but most of these creatures are best admired from a safe distance. From Hippogriffs that
				demand a proper bow to Nifflers that'll nick your jewellery — the wizarding world's wildlife is anything but
				boring. Let's see what's out there!
			</p>
			<section>
				<h2>Available information</h2>
				<search>
					<input type="text" placeholder="Search creatures..." onInput={(e) => setSearch(e.currentTarget.value)} />
				</search>
				{error && (
					<ErrorDisplay entity="creatures" status={error.status} statusText={error.statusText} onRetry={refetchAsync} />
				)}
				{isLoading && (
					<ul data-grid>
						{Array.from({ length: SKELETON_COUNT }, (_, i) => (
							<CardSkeleton key={i} body footer />
						))}
					</ul>
				)}
				{creatures && creatures.length === 0 && (
					<div data-empty>
						<p>No creatures found.</p>
					</div>
				)}
				{creatures && creatures.length > 0 && (
					<ul data-grid>
						{creatures.map((creature) => (
							<data key={creature.id} value={creature.id}>
								<MagicalCreatureCard creature={creature} navState={navState} />
							</data>
						))}
					</ul>
				)}
			</section>
		</>
	);
}

export default MagicalCreaturesIndex;
