import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from '@google-cloud/firestore'

export type FirestoreSnapshot<T extends DocumentData> = DocumentSnapshot<T> | QueryDocumentSnapshot<T>
