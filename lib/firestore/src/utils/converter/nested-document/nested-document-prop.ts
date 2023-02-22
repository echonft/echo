import { FirestoreData } from '../../../types'
import { FirestoreNestedDocumentConverter } from '../../../types/converter/firestore-nested-document-converter'
import { toPromise } from '@echo/utils'
import { DocumentData } from 'firebase/firestore'
import { ifElse, isNil, pipe, prop } from 'ramda'

export const nestedDocumentProp = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  converter: FirestoreNestedDocumentConverter<T, V> | undefined
) => ifElse((_) => isNil(converter), pipe(prop<V>(key), toPromise), pipe(prop<T>(key), converter!))
