import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { FirestoreDocumentData } from '@echo/firestore'
import { castAs, promiseAll, undefinedPromise } from '@echo/utils'
import { DocumentData } from '@google-cloud/firestore'
import { allPass, complement, has, ifElse, isNil, map, pipe, prop } from 'ramda'

export const nestedDocumentArrayProp = <T extends DocumentData, V extends FirestoreDocumentData>(
  key: string,
  converter: FirestoreNestedDocumentConverter<T, V>
) =>
  ifElse<[unknown], Promise<V[]>, Promise<V[]>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<T[]>(key), map(converter), promiseAll, castAs<Promise<V[]>>),
    undefinedPromise<V[]>
  )
