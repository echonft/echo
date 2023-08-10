export const delayPromise = <T>(promise: Promise<T>, delayMs = 2000): Promise<T> =>
  promise.then((result) => new Promise((resolve) => setTimeout(() => resolve(result), delayMs)))
