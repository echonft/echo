import { FirestoreDocumentSnapshot } from './firestore-document-snapshot'
import { DocumentData } from 'firebase/firestore'

export type FirestoreMapper<T extends DocumentData, V> = (snapshot: FirestoreDocumentSnapshot<T>) => Promise<V>
