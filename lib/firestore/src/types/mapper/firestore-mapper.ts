import { DocumentData } from 'firebase/firestore'

/**
 * Maps a firestore object to another model
 */
export type FirestoreMapper<T extends DocumentData, V> = (firestoreObject: T) => Promise<V>
