/**
 * Wraps any value in a promise
 * @param value
 */
export const toPromise = <T = unknown>(value: T) => Promise.resolve<T>(value)
