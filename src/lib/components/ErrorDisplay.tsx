/** Props for {@link ErrorDisplay}. */
type ErrorDisplayProps = {
	entity: string;
	status?: number;
	statusText?: string;
	onRetry?: () => void;
};

/** Maps an HTTP status code to a short user-facing heading. */
function getErrorHeading(status: number | undefined): string {
	if (!status || status === 0) return "Connection failed";
	if (status === 404) return "Not found";
	if (status === 429) return "Too many requests";
	if (status >= 500) return "Server error";
	if (status >= 400) return "Request error";
	return "Something went wrong";
}

/** Maps an HTTP status code to a longer explanation the user can act on. */
function getErrorDescription(status: number | undefined, entity: string): string {
	if (!status || status === 0) return `Could not reach the server. Check your internet connection and try again.`;
	if (status === 404)
		return `The requested ${entity} could not be found. It may have been removed or the link may be incorrect.`;
	if (status === 429) return `The server is receiving too many requests. Please wait a moment and try again.`;
	if (status >= 500)
		return `The Wizard World API is having trouble right now. This is not your fault — try again later.`;
	if (status >= 400) return `The request could not be completed. Please try again.`;
	return `An unexpected error occurred while loading ${entity}.`;
}

/** Displays a friendly error message with an optional retry button. */
function ErrorDisplay({ entity, status, statusText, onRetry }: ErrorDisplayProps) {
	return (
		<div data-error>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="48"
				height="48"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="error-icon"
			>
				<path
					fillRule="evenodd"
					d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.499-2.599 4.499H4.645c-2.309 0-3.752-2.5-2.598-4.499L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
					clipRule="evenodd"
				/>
			</svg>
			<h3 className="error-heading">{getErrorHeading(status)}</h3>
			<p className="error-description">{getErrorDescription(status, entity)}</p>
			{status !== undefined && status > 0 && (
				<p className="error-code">
					{status} {statusText}
				</p>
			)}
			{onRetry && <button onClick={onRetry}>Try again</button>}
		</div>
	);
}

export default ErrorDisplay;
