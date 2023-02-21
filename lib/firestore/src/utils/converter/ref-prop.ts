import { FirestoreConverter } from '../../types/converter'
import { FirestoreData } from '../../types/model/data/abstract/firestore-data'
import { getDocSnapshotFromRef } from '../document/get-doc-snapshot-from-ref'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { andThen, pipe, prop } from 'ramda'

export const refProp = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  converter: FirestoreConverter<T, V>
) => pipe(prop<DocumentReference<T>>(key), pipe(getDocSnapshotFromRef, andThen(converter)))
