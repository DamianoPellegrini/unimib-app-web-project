/** Hamburger menu icon. Accepts standard SVG props. */
export default function Menu(props: React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			viewBox="0 0 24 24"
			fill="currentColor"
			{...props}
			className={`${props.className ?? ""} icon`}
		>
			<path
				fillRule="evenodd"
				d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
