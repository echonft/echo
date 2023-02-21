import { FirestoreSnapshot } from '../abstract/firestore-snapshot'
import { FirestoreData } from '../model/data/abstract/firestore-data'
import { DocumentData } from 'firebase/firestore'

/**
 * Converts a document snapshot to a firestore model object
 */
export type FirestoreConverter<T extends DocumentData, V extends FirestoreData> = (
  snapshot: FirestoreSnapshot<T>
) => Promise<V>
