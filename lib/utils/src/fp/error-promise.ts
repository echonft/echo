/**
 * A function that returns a promise error whatever the arguments are
 * @param reason
 */
export const errorPromise =
  <T = never>(reason: string) =>
  (..._args: [unknown]) =>
    Promise.reject<T>(reason)
