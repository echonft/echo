import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreDocumentData } from '../../types/model/data/abstract/firestore-document-data'
import { promiseAll, undefinedPromise } from '@echo/utils'
import { DocumentData } from 'firebase/firestore'
import { allPass, has, ifElse, isNotNil, map, pipe, prop } from 'ramda'

export const nestedDocumentArrayProp = <T extends DocumentData, V extends FirestoreDocumentData>(
  key: string,
  converter: FirestoreNestedDocumentConverter<T, V>
) =>
  ifElse<[unknown], Promise<V[]>, Promise<V[]>>(
    allPass([has(key), pipe(prop(key), isNotNil)]),
    pipe(prop<T[]>(key), map(converter), promiseAll),
    undefinedPromise<V[]>
  )
