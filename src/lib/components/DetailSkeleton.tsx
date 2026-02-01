type DetailSkeletonProps = {
	/** Number of key-value rows to simulate in the body */
	rows?: number;
};

/** Placeholder skeleton shown while a detail page's data is loading. */
function DetailSkeleton({ rows = 3 }: DetailSkeletonProps) {
	return (
		<div className="DetailPage" data-skeleton aria-busy="true">
			<header>
				<div data-skeleton-line="icon" />
				<hgroup>
					<div data-skeleton-line="lg" />
					<div data-skeleton-line="md" />
				</hgroup>
			</header>
			<section>
				<div data-skeleton-line="lg" style={{ width: "40%" }} />
				{Array.from({ length: rows }, (_, i) => (
					<div key={i} style={{ display: "flex", gap: "var(--space-xl)" }}>
						<div data-skeleton-line="sm" style={{ width: "8rem" }} />
						<div data-skeleton-line="sm" style={{ flex: 1 }} />
					</div>
				))}
			</section>
		</div>
	);
}

export default DetailSkeleton;
