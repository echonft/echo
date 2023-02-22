/**
 * A function that returns undefined whatever the arguments are
 * It can also be casted to anything
 * @param fn
 */
export const notNullable = <T = unknown>(fn: (..._args: [never]) => T | undefined) => fn as (..._args: [unknown]) => T
