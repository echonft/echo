import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore'

export type FirestoreSnapshot<T extends DocumentData> = DocumentSnapshot<T> | QueryDocumentSnapshot<T>
