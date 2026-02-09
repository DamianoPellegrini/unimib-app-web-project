import type React from "react";
import { Hat, Leaf, Paw, Potion, Shield, Wand } from "./components/icons";

/** Base URL for the Wizard World REST API. */
export const API_BASE_URL = "https://wizard-world-api.herokuapp.com";

/** Describes a navigable entity section of the app. */
export type Section = {
	to: string;
	label: string;
	description: string;
	icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

/** All entity sections — used by both the navbar and the home page. */
export const SECTIONS: Section[] = [
	{
		to: "/elixirs",
		label: "Elixirs",
		description: "Potions, brews and magical concoctions catalogued by difficulty and brewing time.",
		icon: Potion,
	},
	{
		to: "/houses",
		label: "Houses",
		description: "The four Hogwarts houses, their founders, colours, animals and defining traits.",
		icon: Shield,
	},
	{
		to: "/ingredients",
		label: "Ingredients",
		description: "Herbs, reagents and magical substances used in the art of potion-brewing.",
		icon: Leaf,
	},
	{
		to: "/magical-creatures",
		label: "Magical Creatures",
		description: "Beasts, beings and spirits classified by the Ministry of Magic.",
		icon: Paw,
	},
	{
		to: "/spells",
		label: "Spells",
		description: "Charms, hexes, curses and incantations — from simple spells to dark arts.",
		icon: Wand,
	},
	{
		to: "/wizards",
		label: "Wizards",
		description: "Witches and wizards who have shaped the course of magical history.",
		icon: Hat,
	},
];
