import { FirestoreData, FirestoreSubcollection } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { propToArray } from './prop-to-array'
import { allPass, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const propToSubcollection = <T extends FirestoreData, V>(key: string, mapper: FirestoreMapper<T, V>) =>
  pipe(
    prop<FirestoreSubcollection<T>>(key),
    ifElse(allPass([has('data'), pipe(prop('data'), complement(isNil))]), propToArray<T, V>('data', mapper), () =>
      Promise.resolve(undefined)
    )
  )
