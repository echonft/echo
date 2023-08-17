import { FirestoreDocumentDataConverter } from '../../../types/converters/firestore-document-data-converter'
import { map, pipe, prop } from 'ramda'

export const documentDataArrayPropToModelArray = <K extends string, T, U>(
  propKey: K,
  converter: FirestoreDocumentDataConverter<T, U>
) => pipe(prop(propKey), map(converter.fromFirestore))
