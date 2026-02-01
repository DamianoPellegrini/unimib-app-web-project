export default function Monster(props: React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1rem"
			height="1rem"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
			{...props}
			className={`${props.className} icon`}
		>
			<title>Monster icon</title>
			<path d="M4 11c0-3.866 3.582-7 8-7s8 3.134 8 7v2.5a5.5 5.5 0 0 1-5.5 5.5H9.5A5.5 5.5 0 0 1 4 13.5V11z" />
			<path d="M5 6.2c.6-.6 1.2-1.6 2-2M19 6.2c-.6-.6-1.2-1.6-2-2" />
			<circle cx="9.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
			<circle cx="14.5" cy="11" r="0.8" fill="currentColor" stroke="none" />
			<path d="M9 14c.8.9 2.7 1.6 3 1.6s2.2-.7 3-1.6" />
			<path d="M11 13.2v.6M13 13.2v.6" strokeLinecap="butt" />
		</svg>
	);
}
