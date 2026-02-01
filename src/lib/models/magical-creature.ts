export const CREATURE_CLASSIFICATIONS = ["None", "Beast", "Being", "Spirit"] as const;
export const CREATURE_STATUSES = ["None", "Extant", "Endangered", "Extinct"] as const;
export const CREATURE_DANGEROUSNESS_LEVELS = ["None", "X", "XX", "XXX", "XXXX", "XXXXX"] as const;

export type CreatureClassification = (typeof CREATURE_CLASSIFICATIONS)[number];
export type CreatureStatus = (typeof CREATURE_STATUSES)[number];
export type CreatureDangerousness = (typeof CREATURE_DANGEROUSNESS_LEVELS)[number];

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
