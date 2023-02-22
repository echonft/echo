/**
 * A function that returns undefined whatever the arguments are
 * It can also be casted to anything
 * @param _args
 */
export const notDefined = <T = undefined>(..._args: [unknown]) => undefined as unknown as T
