import { FirestoreData } from '../../types'
import { FirestoreNestedDocumentConverter } from '../../types/converter/firestore-nested-document-converter'
import { undefinedPromise } from '@echo/utils'
import { DocumentData } from 'firebase/firestore'
import { allPass, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const nestedDocumentProp = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  converter: FirestoreNestedDocumentConverter<T, V> //pipe(prop<T>(key), converter)
) =>
  ifElse<[unknown], Promise<V>, Promise<V>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<T>(key), converter),
    undefinedPromise<V>
  )
