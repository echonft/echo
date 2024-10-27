export function promiseAll<T>(promises: Promise<T>[]) {
  return Promise.all(promises)
}
