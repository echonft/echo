import type { FirestoreDocumentDataConverter } from '@echo/firestore/types/converters/firestore-document-data-converter'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { dissoc, has, ifElse, map, modify, when } from 'ramda'

export function modifyModelArrayProp<K extends string, T, U, V>(
  propKey: K,
  converter: FirestoreDocumentDataConverter<U, V>
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return when(
    has(propKey),
    ifElse(propIsNil(propKey), dissoc(propKey), modify(propKey, map(converter.toFirestore)))
  ) as (obj: T) => T | (T & Record<K, V[]>)
}
