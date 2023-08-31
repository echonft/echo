import { FirestoreDocumentDataConverter } from '../../../types/converters/firestore-document-data-converter'
import { propIsNil } from '@echo/utils'
import { dissoc, has, ifElse, map, modify, when } from 'ramda'

export const modifyModelArrayProp = <K extends string, T, U, V>(
  propKey: K,
  converter: FirestoreDocumentDataConverter<U, V>
) =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  when(has(propKey), ifElse(propIsNil(propKey), dissoc(propKey), modify(propKey, map(converter.toFirestore)))) as (
    obj: T
  ) => T | (T & Record<K, V[]>)
