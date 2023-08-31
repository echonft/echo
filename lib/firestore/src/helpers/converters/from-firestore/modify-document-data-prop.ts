import { FirestoreDocumentDataConverter } from '../../../types/converters/firestore-document-data-converter'
import { propIsNil } from '@echo/utils'
import { assoc, has, ifElse, modify, unless } from 'ramda'

export const modifyDocumentDataProp = <K extends string, T, U, V>(
  propKey: K,
  converter: FirestoreDocumentDataConverter<U, V>
) =>
  ifElse(
    has(propKey),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    unless(propIsNil(propKey), modify(propKey, converter.fromFirestore)),
    assoc(propKey, undefined)
  ) as (documentData: T) => T & Record<K, V | undefined>
