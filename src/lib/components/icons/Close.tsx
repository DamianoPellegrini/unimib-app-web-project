/** Close (X) icon. Accepts standard SVG props. */
export default function Close(props: React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>) {
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
				d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
