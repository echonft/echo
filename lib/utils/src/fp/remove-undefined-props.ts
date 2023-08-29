import { isNil, reject } from 'ramda'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const removeUndefinedProps = <T>(obj: T): Partial<T> => reject(isNil)(obj)
