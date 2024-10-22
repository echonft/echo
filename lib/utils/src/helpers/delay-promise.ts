function delay(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve, _reject) => {
    setTimeout(() => {
      resolve()
    }, milliseconds)
  })
}

export function delayPromise<T>(milliseconds = 2000): (promise: Promise<T>) => Promise<T> {
  return async function (promise: Promise<T>): Promise<T> {
    await delay(milliseconds)
    return await promise
  }
}
