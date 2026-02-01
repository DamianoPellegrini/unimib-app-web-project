import type { Wizard } from "./wizard";

/** All possible difficulty levels returned by the API for an elixir. */
export const ELIXIR_DIFFICULTIES = [
	"Unknown",
	"Advanced",
	"Moderate",
	"Beginner",
	"OrdinaryWizardingLevel",
	"OneOfAKind",
] as const;

export type ElixirDifficulty = (typeof ELIXIR_DIFFICULTIES)[number];

/** A potion or brew returned by the /Elixirs endpoint. */
export interface Elixir {
	id: string;
	name?: string;
	effect?: string;
	sideEffects?: string;
	characteristics?: string;
	time?: string;
	difficulty: ElixirDifficulty;
	ingredients?: ElixirIngredient[];
	inventors?: Pick<Wizard, "id" | "firstName" | "lastName">[];
	manufacturer?: string;
}

/** Ingredient entry as nested inside an {@link Elixir} or returned by /Ingredients. */
export interface ElixirIngredient {
	id: string;
	name?: string;
}
