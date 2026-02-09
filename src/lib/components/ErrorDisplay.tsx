import { Warning } from "./icons";

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
			<Warning width="48" height="48" className="error-icon" />
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
