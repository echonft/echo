import { FirestorePrototypeData } from '../prototypes/base/firestore-prototype-data'
import { DocumentData } from 'firebase-admin/firestore'

/**
 * Converts a prototype object to a firestore object ready to be written in the db
 */
export type FirestoreBuilder<T extends FirestorePrototypeData, V extends DocumentData> = (prototype: T) => Promise<V>
