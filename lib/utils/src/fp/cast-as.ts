import { identity } from 'ramda'

export const castAs = <T>(value: unknown): T => identity(value) as T
