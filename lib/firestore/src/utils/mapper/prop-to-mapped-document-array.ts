import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreDocumentData } from '../../types/model/data/abstract/firestore-document-data'
import { castAs, promiseAll, toPromise, undefinedPromise } from '@echo/utils'
import { allPass, complement, has, ifElse, isNil, map, pipe, prop } from 'ramda'

export const propToMappedDocumentArray = <T extends FirestoreDocumentData, V>(
  key: string,
  mapper: FirestoreMapper<T, V>
) =>
  ifElse<[unknown], Promise<V[]>, Promise<V[]>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<T[]>(key), map(pipe(toPromise, mapper)), promiseAll, castAs<Promise<V[]>>),
    undefinedPromise<V[]>
  )
