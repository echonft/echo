import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { getDocSnapshotFromRef } from '../document/get-doc-snapshot-from-ref'
import { FirestoreData } from '@echo/firestore'
import { undefinedPromise } from '@echo/utils'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'
import { allPass, andThen, complement, has, ifElse, isNil, pipe, prop } from 'ramda'

export const refProp = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  converter: FirestoreConverter<T, V>
) =>
  ifElse<[unknown], Promise<V>, Promise<V>>(
    allPass([has(key), pipe(prop(key), complement(isNil))]),
    pipe(prop<DocumentReference<T>>(key), pipe(getDocSnapshotFromRef, andThen(converter))),
    undefinedPromise<V>
  )
