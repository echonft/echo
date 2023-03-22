/**
 * Wraps any value in a promise
 * @param value
 */
export const toPromise = <T>(value: unknown) => Promise.resolve<T>(value as T)
