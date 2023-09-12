import { toPromise } from '@echo-utils/fp/to-promise'
import { pipe, prop } from 'ramda'

export const propToPromise = <T>(key: string) => pipe(prop<T>(key), toPromise)
