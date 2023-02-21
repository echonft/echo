import { FirestoreConverter } from '../../types/converter'
import { getDocSnapshotFromRef } from '../document/get-doc-snapshot-from-ref'
import { FirestoreData } from '@echo/firestore'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'
import { andThen, pipe, prop } from 'ramda'

export const refProp = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  converter: FirestoreConverter<T, V>
) => pipe(prop<DocumentReference<T>>(key), pipe(getDocSnapshotFromRef, andThen(converter)))
