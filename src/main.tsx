import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
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

createRoot(document.getElementsByTagName("body")[0]).render(
	<StrictMode>
		<BrowserRouter basename={import.meta.env.BASE_URL}>
			<Routes>
				<Route element={<AppLayout />}>
					<Route index element={<App />} />
					<Route path="elixirs">
						<Route index element={<Elixirs />} />
						<Route path=":id" element={<ElixirDetail />} />
					</Route>
					<Route path="houses">
						<Route index element={<Houses />} />
						<Route path=":id" element={<HouseDetail />} />
					</Route>
					<Route path="ingredients">
						<Route index element={<Ingredients />} />
						<Route path=":id" element={<IngredientDetail />} />
					</Route>
					<Route path="magical-creatures">
						<Route index element={<MagicalCretures />} />
						<Route path=":id" element={<MagicalCretureDetail />} />
					</Route>
					<Route path="spells">
						<Route index element={<Spells />} />
						<Route path=":id" element={<SpellDetail />} />
					</Route>
					<Route path="wizards">
						<Route index element={<Wizards />} />
						<Route path=":id" element={<WizardDetail />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
