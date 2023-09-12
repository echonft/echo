import { FirestoreDocumentDataConverter } from '../../../types/converters/firestore-document-data-converter'
import propIsNil from '@echo/utils/prop-is-nil'
import { dissoc, has, ifElse, modify, when } from 'ramda'

export function modifyDocumentDataProp<K extends string, T, U, V>(
  propKey: K,
  converter: FirestoreDocumentDataConverter<U, V>
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(has(propKey), ifElse(propIsNil(propKey), dissoc(propKey), modify(propKey, converter.fromFirestore))) as (
    documentData: T
  ) => T & Record<K, V | undefined>
}
