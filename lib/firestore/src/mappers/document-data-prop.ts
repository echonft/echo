import { FirestoreData } from '../types'
import { FirestoreMapper } from '../types/mapper'
import { toPromise } from '@echo/utils'
import { has, ifElse, pipe, prop } from 'ramda'

export const documentDataProp = <T extends FirestoreData, V>(key: string, mapper: FirestoreMapper<T, V>) =>
  ifElse(has(key), pipe(prop<T>(key), toPromise, mapper), () => Promise.resolve(undefined))
