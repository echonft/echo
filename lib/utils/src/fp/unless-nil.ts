import { isNil, unless } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const unlessNil = <T, U>(fn: (a: T) => U): ((a: T) => undefined | U) => unless<T, U>(isNil, fn)
