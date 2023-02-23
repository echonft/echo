import { DocumentData } from 'firebase/firestore'

/**
 * Converts a model object to a firestore object ready to be written in the db
 */
export type FirestoreSerializer<T, V extends DocumentData> = (modelObject: T) => V
