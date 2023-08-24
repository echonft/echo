import { FirestoreDocumentDataConverter } from '../../../types/converters/firestore-document-data-converter'
import { modify } from 'ramda'

export const modelPropToDocumentData = <K extends string, T, U>(
  prop: K,
  converter: FirestoreDocumentDataConverter<T, U>
) => modify<K, U, T>(prop, converter.toFirestore)
