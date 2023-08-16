import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase-admin/firestore'

export type FirestoreSnapshot<T extends DocumentData> = DocumentSnapshot<T> | QueryDocumentSnapshot<T>
