import type { Elixir } from "./elixir";

export interface Wizard {
	id: string;
	firstName?: string;
	lastName?: string;
	elixirs: Pick<Elixir, "id" | "name">[];
}

export const WIZARD_TRAITS = [
	"None",
	"Courage",
	"Bravery",
	"Determination",
	"Daring",
	"Nerve",
	"Chivalary",
	"Hardworking",
	"Patience",
	"Fairness",
	"Just",
	"Loyalty",
	"Modesty",
	"Wit",
	"Learning",
	"Wisdom",
	"Acceptance",
	"Inteligence",
	"Creativity",
	"Resourcefulness",
	"Pride",
	"Cunning",
	"Ambition",
	"Selfpreservation",
] as const;

export interface WizardTrait {
	id: string;
	name: (typeof WIZARD_TRAITS)[number];
}
