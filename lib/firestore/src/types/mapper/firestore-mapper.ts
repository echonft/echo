import { FirestoreDocumentData } from '../model/data/abstract/firestore-document-data'

/**
 * Maps a firestore data object to a model object
 */
export type FirestoreMapper<T extends FirestoreDocumentData, V> = (data: Promise<T>) => Promise<V>
