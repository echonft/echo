export function toRejectedPromise<T>(value?: T) {
  return Promise.reject<T>(value)
}
