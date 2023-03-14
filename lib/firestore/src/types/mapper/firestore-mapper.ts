import { FirestoreData } from '../model'

/**
 * Maps a firestore data object to a model object
 */
export type FirestoreMapper<T extends FirestoreData, V> = (data: Promise<T>) => Promise<V>
