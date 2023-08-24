import { isNil, reject } from 'ramda'

export const removeUndefinedProps = reject(isNil)
