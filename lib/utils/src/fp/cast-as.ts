import { identity } from 'ramda'

export const castAs = <T, V>(value: T): V => identity<T>(value) as unknown as V
