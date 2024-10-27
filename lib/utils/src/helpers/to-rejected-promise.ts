export function toRejectedPromise<T extends unknown[] = never[]>(..._args: T) {
  return Promise.reject(new Error())
}
