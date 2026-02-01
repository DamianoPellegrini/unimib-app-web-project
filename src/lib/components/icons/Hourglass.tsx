/** Hourglass icon used for brewing time indicators. */
export default function Hourglass(props: React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>) {
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
			<title>Hourglass icon</title>
			<path d="M6 2h12M6 22h12" />
			<path d="M7 2v5.5c0 1.8 1.8 3.2 3.6 3.9L12 12l1.4-.6c1.8-.7 3.6-2.1 3.6-3.9V2" />
			<path d="M7 22v-5.5c0-1.8 1.8-3.2 3.6-3.9L12 12l1.4.6c1.8.7 3.6 2.1 3.6 3.9V22" />
			<path d="M12 9.2v1.6" strokeLinecap="round" />
			<path d="M9.5 17.5c.6.9 1.7 1.5 2.5 1.5s1.9-.6 2.5-1.5" />
			<path d="M12 14.5c-.5-.6-.8-1.1-.8-1.6 0-.8.7-1.4 1.6-1.4S14.4 12 14.4 12.8c0 .5-.3 1-.8 1.6" />
		</svg>
	);
}
