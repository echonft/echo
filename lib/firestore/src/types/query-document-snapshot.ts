import { type QueryDocumentSnapshot as FirestoreQueryDocumentSnapshot } from 'firebase-admin/firestore'

export type QueryDocumentSnapshot<T> = FirestoreQueryDocumentSnapshot<T>
