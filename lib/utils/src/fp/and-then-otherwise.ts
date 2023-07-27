export const andThenOtherwise =
  <A, B>(onSuccess: (a: A) => B | Promise<B>, onError: (error: Error) => B | Promise<B>) =>
  (promise: Promise<A>) =>
    promise.then(onSuccess).catch(onError)
