import { FirestoreDocumentDataConverter } from '../../../types/converters/firestore-document-data-converter'
import { pipe, prop } from 'ramda'

export const documentDataPropToModel = <K extends string, T, U>(
  propKey: K,
  converter: FirestoreDocumentDataConverter<T, U>
) => pipe(prop(propKey), converter.fromFirestore)
