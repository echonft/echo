export function wait<T>(ms: number, value: T) {
  return new Promise<T>((resolve) => setTimeout(resolve, ms, value))
}

export function PromiseWithDelay<T>(value: T, delay = 1000) {
  return wait(delay, value)
}
