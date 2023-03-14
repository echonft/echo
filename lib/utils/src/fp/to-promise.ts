/**
 * Wraps any value in a promise
 * @param value
 */
export const toPromise = <T>(value: T) => Promise.resolve(value)
