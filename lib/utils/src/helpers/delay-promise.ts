export async function delayPromise<T>(promise: Promise<T>, delayMs = 2000): Promise<T> {
  const result = await promise
  return await new Promise((resolve) => setTimeout(() => resolve(result), delayMs))
}
