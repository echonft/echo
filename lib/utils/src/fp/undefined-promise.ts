/**
 * A function that returns Promise<undefined> whatever the arguments are
 * It can also be casted to anything
 * @param _args
 */
export const undefinedPromise = <T = undefined>(..._args: [unknown]) => Promise.resolve(undefined as unknown as T)
