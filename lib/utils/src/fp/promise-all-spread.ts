export function promiseAllSpread<T = unknown>(...promises: [Promise<T>]) {
  return Promise.all(promises)
}
