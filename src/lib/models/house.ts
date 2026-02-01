import type { Wizard, WizardTrait } from "./wizard";

export interface House {
	id: string;
	name?: string;
	houseColours?: string;
	founder?: string;
	animal?: string;
	element?: string;
	ghost?: string;
	commonRoom?: string;
	heads?: Pick<Wizard, "id" | "firstName" | "lastName">[];
	traits?: WizardTrait[];
}
