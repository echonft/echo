import { isEmpty, isNil, or } from 'ramda'

export const isNilOrEmpty = or(isNil, isEmpty)
