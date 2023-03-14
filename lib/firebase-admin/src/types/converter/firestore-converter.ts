import { FirestoreSnapshot } from '../abstract/firestore-snapshot'
import { FirestoreData } from '@echo/firestore'
import { DocumentData } from '@google-cloud/firestore'

/**
 * Converts a document snapshot to a firestore model object
 */
export type FirestoreConverter<T extends DocumentData, V extends FirestoreData> = (
  snapshot: FirestoreSnapshot<T>
) => Promise<V>
