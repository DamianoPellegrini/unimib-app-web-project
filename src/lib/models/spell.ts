/** All spell type values returned by the API. */
export const SPELL_TYPES = [
	"None",
	"Charm",
	"Conjuration",
	"Spell",
	"Transfiguration",
	"HealingSpell",
	"DarkCharm",
	"Jinx",
	"Curse",
	"MagicalTransportation",
	"Hex",
	"CounterSpell",
	"DarkArts",
	"CounterJinx",
	"CounterCharm",
	"Untransfiguration",
	"BindingMagicalContract",
	"Vanishment",
] as const;

/** All spell light colour values returned by the API. */
export const SPELL_LIGHTS = [
	"None",
	"Blue",
	"IcyBlue",
	"Red",
	"Gold",
	"Purple",
	"Transparent",
	"White",
	"Green",
	"Orange",
	"Yellow",
	"BrightBlue",
	"Pink",
	"Violet",
	"BlueishWhite",
	"Silver",
	"Scarlet",
	"Fire",
	"FieryScarlet",
	"Grey",
	"DarkRed",
	"Turquoise",
	"PsychedelicTransparentWave",
	"BrightYellow",
	"BlackSmoke",
] as const;

export type SpellType = (typeof SPELL_TYPES)[number];
export type SpellLight = (typeof SPELL_LIGHTS)[number];

/** A spell returned by the /Spells endpoint. */
export interface Spell {
	id: string;
	name?: string;
	incantation?: string;
	effect?: string;
	canBeVerbal?: boolean;
	type: SpellType;
	light: SpellLight;
	creator?: string;
}
