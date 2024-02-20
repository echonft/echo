/**
 * Wraps any value in a promise
 * @param value
 */
export function toPromise<T>(value: T) {
  return Promise.resolve<T>(value)
}
