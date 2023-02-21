import { FirestoreData, FirestoreSubcollection } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToArray } from './prop-to-array'
import { ifElse, isNil, pipe, prop } from 'ramda'

export const propToSubcollection = <T extends FirestoreData, V>(key: string, mapper: FirestoreMapper<T, V>) =>
  pipe(
    prop<FirestoreSubcollection<T>>(key),
    ifElse(pipe(prop<T[]>('data'), isNil), () => Promise.resolve(undefined), propToArray<T, V>('data', mapper))
  )
