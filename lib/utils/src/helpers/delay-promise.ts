function delay(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve, _reject) => {
    setTimeout(() => {
      resolve()
    }, milliseconds)
  })
}

export function delayPromise<TArgs extends unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  milliseconds = 2000
): (...args: TArgs) => Promise<TResult> {
  return async function (...args: TArgs): Promise<TResult> {
    await delay(milliseconds)
    return await fn(...args)
  }
}
