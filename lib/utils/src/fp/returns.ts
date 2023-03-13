import { identity } from 'ramda'

/**
 * Returns a function that takes any arguments and return the passed value
 * @param value
 */
export const returns =
  <T>(value: T) =>
  (..._args: [unknown]) =>
    identity<T>(value)
