import { FirestoreConverter } from '../../types/converter'
import { FirestoreData } from '../../types/model/data/firestore-data'
import { getDocSnapshotFromRef } from '../document/get-doc-snapshot-from-ref'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { andThen, map, pipe, prop } from 'ramda'

export const propToDataArray = <T extends DocumentData, V extends FirestoreData>(
  key: string,
  converter: FirestoreConverter<T, V>
) =>
  pipe(prop<DocumentReference<T>[]>(key), map(pipe(getDocSnapshotFromRef, andThen(converter))), (promises) =>
    Promise.all(promises)
  )
