import { toPromise } from './to-promise'
import { pipe, prop } from 'ramda'

export const propToPromise = <T>(key: string) => pipe(prop<T>(key), toPromise)
