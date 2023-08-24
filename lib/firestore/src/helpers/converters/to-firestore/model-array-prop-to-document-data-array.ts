import { FirestoreDocumentDataConverter } from '../../../types/converters/firestore-document-data-converter'
import { map, modify } from 'ramda'

export const modelArrayPropToDocumentDataArray = <K extends string, T, U>(
  prop: K,
  converter: FirestoreDocumentDataConverter<T, U>
) => modify<K, U[], T[]>(prop, map(converter.toFirestore))
