import { FirestoreDocumentDataConverter } from '../../types/converters/firestore-document-data-converter'
import { assoc, has, ifElse, isNil, map, modify, unless } from 'ramda'

export const documentDataArrayPropToModelArray = <K extends string, T, U>(
  prop: K,
  converter: FirestoreDocumentDataConverter<T, U>
) =>
  ifElse(
    has(prop),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify<K, T[] | undefined, U[] | undefined>(prop, unless(isNil, map(converter.fromFirestore))),
    assoc(prop, undefined)
  )
