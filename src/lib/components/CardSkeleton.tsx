type CardSkeletonProps = {
	/** Show a subtitle line below the title */
	subtitle?: boolean;
	/** Show a full-width body block */
	body?: boolean;
	/** Show a medium-width footer line */
	footer?: boolean;
};

/** Placeholder skeleton shown while a card's data is loading. */
function CardSkeleton({ subtitle = false, body = false, footer = false }: CardSkeletonProps) {
	return (
		<div data-skeleton>
			<div style={{ display: "flex", gap: "var(--space-lg)" }}>
				<div data-skeleton-line="icon" />
				<div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
					<div data-skeleton-line="lg" />
					{subtitle && <div data-skeleton-line="sm" />}
				</div>
			</div>
			{body && <div data-skeleton-line="full" />}
			{footer && <div data-skeleton-line="md" />}
		</div>
	);
}

export default CardSkeleton;
