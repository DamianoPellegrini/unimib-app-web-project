/** Returns a promise that resolves after {@link ms} milliseconds. */
export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
