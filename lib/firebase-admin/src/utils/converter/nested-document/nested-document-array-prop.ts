import { FirestoreNestedDocumentConverter } from '../../../types/converter/firestore-nested-document-converter'
import { FirestoreData } from '@echo/firestore'
import { DocumentData } from '@google-cloud/firestore'
import { map, pipe, prop } from 'ramda'

export const nestedDocumentArrayProp = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  converter: FirestoreNestedDocumentConverter<T, V>
) => pipe(prop<T[]>(key), map(converter), (promises) => Promise.all(promises))
