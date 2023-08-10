import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreDocumentData } from '@echo/firestore'
import { promiseAll, undefinedPromise } from '@echo/utils'
import { DocumentData } from '@google-cloud/firestore'
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
