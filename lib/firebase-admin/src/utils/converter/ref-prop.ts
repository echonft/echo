import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { getDocSnapshotFromRef } from '../document/get-doc-snapshot-from-ref'
import { FirestoreDocumentData } from '@echo/firestore'
import { undefinedPromise } from '@echo/utils'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'
import { allPass, andThen, has, ifElse, isNotNil, pipe, prop } from 'ramda'

export const refProp = <T extends DocumentData, V extends FirestoreDocumentData>(
  key: string,
  converter: FirestoreConverter<T, V>
) =>
  ifElse<[unknown], Promise<V>, Promise<V>>(
    allPass([has(key), pipe(prop(key), isNotNil)]),
    pipe(prop<DocumentReference<T>>(key), pipe(getDocSnapshotFromRef, andThen(converter))),
    undefinedPromise<V>
  )
