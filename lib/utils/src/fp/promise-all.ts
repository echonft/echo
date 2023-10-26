export function promiseAll<T = unknown>(promises: Promise<T>[]) {
  return Promise.all(promises)
}
