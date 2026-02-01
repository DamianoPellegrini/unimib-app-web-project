import type { Elixir } from "./elixir";

/** A witch or wizard returned by the /Wizards endpoint. */
export interface Wizard {
	id: string;
	firstName?: string;
	lastName?: string;
	elixirs: Pick<Elixir, "id" | "name">[];
}

/** All personality trait values used by the API. */
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

/** A named personality trait assigned to a house or wizard. */
export interface WizardTrait {
	id: string;
	name: (typeof WIZARD_TRAITS)[number];
}
