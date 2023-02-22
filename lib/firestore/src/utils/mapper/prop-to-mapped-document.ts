import { FirestoreData } from '../../types'
import { FirestoreMapper } from '../../types/mapper'
import { toPromise, undefinedPromise } from '@echo/utils'
import { allPass, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const propToMappedDocument = <T extends FirestoreData, V>(key: string, mapper: FirestoreMapper<T, V>) =>
  ifElse<[unknown], Promise<V>, Promise<V>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<T>(key), toPromise, mapper),
    undefinedPromise<V>
  )
