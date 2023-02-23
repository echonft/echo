import { FirestoreData } from '../../types'
import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { undefinedPromise } from '@echo/utils'
import { DocumentData } from 'firebase/firestore'
import { allPass, complement, has, ifElse, isNil, map, pipe, prop } from 'ramda'

export const nestedDocumentArrayProp = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  converter: FirestoreNestedDocumentConverter<T, V>
) =>
  ifElse<[unknown], Promise<V[]>, Promise<V[]>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<T[]>(key), map(converter), (promises) => Promise.all(promises)),
    undefinedPromise<V[]>
  )
