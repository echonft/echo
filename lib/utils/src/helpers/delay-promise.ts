export function delayPromise<T>(promise: Promise<T>, delayMs = 2000): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(promise), delayMs))
}
