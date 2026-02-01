import type { Wizard } from "./wizard";

export const ELIXIR_DIFFICULTIES = [
	"Unknown",
	"Advanced",
	"Moderate",
	"Beginner",
	"OrdinaryWizardingLevel",
	"OneOfAKind",
] as const;

export type ElixirDifficulty = (typeof ELIXIR_DIFFICULTIES)[number];

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

export interface ElixirIngredient {
	id: string;
	name?: string;
}
