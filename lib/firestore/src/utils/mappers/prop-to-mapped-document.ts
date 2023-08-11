import { FirestoreMapper } from '../../types/mapper/firestore-mapper'
import { FirestoreDocumentData } from '../../types/model/data/abstract/firestore-document-data'
import { toPromise, undefinedPromise } from '@echo/utils'
import { allPass, has, ifElse, isNotNil, pipe, prop } from 'ramda'

export const propToMappedDocument = <T extends FirestoreDocumentData, V>(key: string, mapper: FirestoreMapper<T, V>) =>
  ifElse<[unknown], Promise<V>, Promise<V>>(
    allPass([has(key), pipe(prop(key), isNotNil)]),
    pipe(prop<T>(key), toPromise, mapper),
    undefinedPromise<V>
  )
