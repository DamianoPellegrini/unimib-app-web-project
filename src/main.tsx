import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";
import "./index.css";
import App from "./pages/App";
import AppLayout from "./pages/AppLayout";
import Elixirs from "./pages/Elixirs";
import ElixirDetail from "./pages/Elixirs/Detail";
import Houses from "./pages/Houses";
import HouseDetail from "./pages/Houses/Detail";
import Ingredients from "./pages/Ingredients";
import IngredientDetail from "./pages/Ingredients/Detail";
import MagicalCretures from "./pages/MagicalCreatures";
import MagicalCretureDetail from "./pages/MagicalCreatures/Detail";
import Spells from "./pages/Spells";
import SpellDetail from "./pages/Spells/Detail";
import Wizards from "./pages/Wizards";
import WizardDetail from "./pages/Wizards/Detail";

/**
 * Here using createBrowserRouter instead of the BrowserRouter provider component just to support view transition
 */
const router = createBrowserRouter(
	[
		{
			element: <AppLayout />,
			children: [
				{ index: true, element: <App /> },
				{
					path: "elixirs",
					children: [
						{ index: true, element: <Elixirs /> },
						{ path: ":id", element: <ElixirDetail /> },
					],
				},
				{
					path: "houses",
					children: [
						{ index: true, element: <Houses /> },
						{ path: ":id", element: <HouseDetail /> },
					],
				},
				{
					path: "ingredients",
					children: [
						{ index: true, element: <Ingredients /> },
						{ path: ":id", element: <IngredientDetail /> },
					],
				},
				{
					path: "magical-creatures",
					children: [
						{ index: true, element: <MagicalCretures /> },
						{ path: ":id", element: <MagicalCretureDetail /> },
					],
				},
				{
					path: "spells",
					children: [
						{ index: true, element: <Spells /> },
						{ path: ":id", element: <SpellDetail /> },
					],
				},
				{
					path: "wizards",
					children: [
						{ index: true, element: <Wizards /> },
						{ path: ":id", element: <WizardDetail /> },
					],
				},
			],
		},
	],
	{ basename: import.meta.env.BASE_URL },
);

createRoot(document.getElementsByTagName("body")[0]).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
