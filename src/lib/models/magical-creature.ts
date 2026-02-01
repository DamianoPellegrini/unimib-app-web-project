/** Ministry of Magic classification categories for magical creatures. */
export const CREATURE_CLASSIFICATIONS = ["None", "Beast", "Being", "Spirit"] as const;

/** Conservation statuses a creature can have. */
export const CREATURE_STATUSES = ["None", "Extant", "Endangered", "Extinct"] as const;

/** Ministry dangerousness ratings from X (boring) to XXXXX (kill you dead). */
export const CREATURE_DANGEROUSNESS_LEVELS = ["None", "X", "XX", "XXX", "XXXX", "XXXXX"] as const;

export type CreatureClassification = (typeof CREATURE_CLASSIFICATIONS)[number];
export type CreatureStatus = (typeof CREATURE_STATUSES)[number];
export type CreatureDangerousness = (typeof CREATURE_DANGEROUSNESS_LEVELS)[number];

/** A magical creature returned by the /MagicalCreatures endpoint. */
export interface MagicalCreature {
	id: string;
	name?: string;
	description: string;
	classification: CreatureClassification;
	status: CreatureStatus;
	dangerousnessLevel: CreatureDangerousness;
	creatureRelations?: string[];
	nativeTo?: string;
}
