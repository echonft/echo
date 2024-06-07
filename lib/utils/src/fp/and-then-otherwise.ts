export function andThenOtherwise<T, OnThen, OnError>(
  onThen: (obj: T) => OnThen | Promise<OnThen>,
  onError: (error: Error) => OnError | Promise<OnError>
) {
  return async function (promise: Promise<T>) {
    return promise.then(onThen).catch((e: unknown) => onError(e as Error))
  }
}
