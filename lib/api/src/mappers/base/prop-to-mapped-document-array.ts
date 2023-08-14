import { FirestoreMapper } from '../../types/mappers/firestore-mapper'
import { FirestoreDocumentData } from '@echo/firestore'
import { promiseAll, toPromise, undefinedPromise } from '@echo/utils'
import { allPass, has, ifElse, isNotNil, map, pipe, prop } from 'ramda'

export const propToMappedDocumentArray = <T extends FirestoreDocumentData, V>(
  key: string,
  mapper: FirestoreMapper<T, V>
) =>
  ifElse<[unknown], Promise<V[]>, Promise<V[]>>(
    allPass([has(key), pipe(prop(key), isNotNil)]),
    pipe(prop<T[]>(key), map(pipe(toPromise, mapper)), promiseAll),
    undefinedPromise<V[]>
  )
