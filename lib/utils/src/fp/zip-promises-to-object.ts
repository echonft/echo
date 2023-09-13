import { zipObject } from '@echo/utils/fp/zip-object'
import { andThen } from 'ramda'

export const zipPromisesToObject = <T>(keys: (keyof T)[]) => andThen(zipObject<T>(keys))
