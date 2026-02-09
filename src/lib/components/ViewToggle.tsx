import { Grid, List } from "./icons";

type ViewMode = "grid" | "list";

interface ViewToggleProps {
	view: ViewMode;
	onViewChange: (view: ViewMode) => void;
}

/** Toggle button pair for switching between grid and list view layouts. */
export default function ViewToggle({ view, onViewChange }: ViewToggleProps) {
	return (
		<div className="ViewToggle">
			<button
				type="button"
				aria-label="Grid view"
				aria-pressed={view === "grid"}
				onClick={() => onViewChange("grid")}
			>
				<Grid />
			</button>
			<button
				type="button"
				aria-label="List view"
				aria-pressed={view === "list"}
				onClick={() => onViewChange("list")}
			>
				<List />
			</button>
		</div>
	);
}

export type { ViewMode };
