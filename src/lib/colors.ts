/** Pastel oklch colors mapped by Hogwarts house name. */
const HOUSE_COLORS: Record<string, string> = {
	Gryffindor: "oklch(0.8 0.08 0)",
	Hufflepuff: "oklch(0.8 0.08 89.03)",
	Ravenclaw: "oklch(0.8 0.08 247.55)",
	Slytherin: "oklch(0.8 0.08 158.87)",
};

/** Returns the oklch accent colour for a given house name, or undefined if unknown. */
export function getHouseColor(name?: string) {
	if (name && name in HOUSE_COLORS) return HOUSE_COLORS[name];
	return undefined;
}

/** Pastel oklch colors mapped by spell light value. */
const SPELL_LIGHT_COLORS: Record<string, string> = {
	Blue: "oklch(0.8 0.08 247.55)",
	BrightBlue: "oklch(0.85 0.1 247.55)",
	IcyBlue: "oklch(0.85 0.08 220)",
	BlueishWhite: "oklch(0.9 0.04 240)",
	Turquoise: "oklch(0.8 0.08 195)",
	Green: "oklch(0.8 0.08 158.87)",
	Red: "oklch(0.8 0.08 0)",
	DarkRed: "oklch(0.7 0.1 15)",
	Scarlet: "oklch(0.75 0.1 25)",
	FieryScarlet: "oklch(0.75 0.12 30)",
	Orange: "oklch(0.8 0.08 55)",
	Yellow: "oklch(0.8 0.08 89.03)",
	BrightYellow: "oklch(0.85 0.1 89.03)",
	Gold: "oklch(0.8 0.08 75)",
	Purple: "oklch(0.8 0.08 289.56)",
	Violet: "oklch(0.8 0.08 305)",
	Pink: "oklch(0.8 0.08 322.84)",
	White: "oklch(0.9 0.02 260)",
	Silver: "oklch(0.85 0.02 260)",
	Grey: "oklch(0.7 0.02 260)",
	Fire: "oklch(0.8 0.1 40)",
	BlackSmoke: "oklch(0.5 0.02 260)",
};

/** Returns the oklch accent colour for a given spell light value, or undefined if unknown. */
export function getSpellColor(light?: string) {
	if (light && light in SPELL_LIGHT_COLORS) return SPELL_LIGHT_COLORS[light];
	return undefined;
}
