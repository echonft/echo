import { anyPass, isEmpty, isNil } from 'ramda'

export const isNilOrEmpty = anyPass([isNil, isEmpty])
