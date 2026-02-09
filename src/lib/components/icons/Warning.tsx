/** Warning triangle icon used for error displays. */
export default function Warning(props: React.PropsWithoutRef<React.SVGProps<SVGSVGElement>>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="1rem"
			height="1rem"
			viewBox="0 0 24 24"
			fill="currentColor"
			{...props}
			className={`${props.className} icon`}
		>
			<path
				fillRule="evenodd"
				d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.499-2.599 4.499H4.645c-2.309 0-3.752-2.5-2.598-4.499L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
				clipRule="evenodd"
			/>
		</svg>
	);
}
