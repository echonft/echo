export const promiseAll = <T = unknown>(promises: Promise<T>[]) => Promise.all(promises)
