import React from "react";
import CardSkeleton from "../../lib/components/CardSkeleton";
import IngredientCard from "../../lib/components/IngredientCard";
import { Leaf } from "../../lib/components/icons";
import { useIngredients } from "../../lib/hooks/use-ingredients";

const SKELETON_COUNT = 6;

function IngredientsIndex() {
	const [search, setSearch] = React.useState("");
	const { ingredients, isLoading, error, refetchAsync } = useIngredients({
		textSearch: search,
	});

	return (
		<>
			<header>
				<Leaf className="big" />
				<hgroup>
					<h1>Ingredients</h1>
					<p>Everything Professor Snape keeps in those creepy jars</p>
				</hgroup>
			</header>
			<p>
				Bezoars, boomslang skin, lacewing flies — the potions cupboard is full of things you probably wouldn't want to
				touch without gloves. But get the right combination and you might just brew something brilliant. Rummage through
				the shelves and see what's in stock.
			</p>
			<section>
				<h2>Available information</h2>
				<search>
					<input type="text" placeholder="Search ingredients..." onInput={(e) => setSearch(e.currentTarget.value)} />
				</search>
				{error && (
					<div data-error>
						<p>Failed to load ingredients.</p>
						<button onClick={refetchAsync}>Retry</button>
					</div>
				)}
				{isLoading && (
					<ul data-grid>
						{Array.from({ length: SKELETON_COUNT }, (_, i) => (
							<CardSkeleton key={i} />
						))}
					</ul>
				)}
				{ingredients && ingredients.length === 0 && (
					<div data-empty>
						<p>No ingredients found.</p>
					</div>
				)}
				{ingredients && ingredients.length > 0 && (
					<ul data-grid>
						{ingredients.map((ingredient) => (
							<data key={ingredient.id} value={ingredient.id}>
								<IngredientCard ingredient={ingredient} />
							</data>
						))}
					</ul>
				)}
			</section>
		</>
	);
}

export default IngredientsIndex;
