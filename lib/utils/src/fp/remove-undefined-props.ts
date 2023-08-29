import { isNil, reject } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const removeUndefinedProps = <T>(obj: T) => reject(isNil)(obj) as Partial<T>
