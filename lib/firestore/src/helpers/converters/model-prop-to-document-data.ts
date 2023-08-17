import { FirestoreDocumentDataConverter } from '../../types/converters/firestore-document-data-converter'
import { assoc, has, ifElse, isNil, modify, unless } from 'ramda'

export const modelPropToDocumentData = <K extends string, T, U>(
  prop: K,
  converter: FirestoreDocumentDataConverter<T, U>
) =>
  ifElse(
    has(prop),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify<K, U | undefined, T | undefined>(prop, unless(isNil, converter.toFirestore)),
    assoc(prop, undefined)
  )
