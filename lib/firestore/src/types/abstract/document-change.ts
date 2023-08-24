import { DocumentChange as FirestoreDocumentChange, DocumentData } from 'firebase-admin/firestore'

export interface DocumentChange<T extends DocumentData> extends FirestoreDocumentChange<T> {}
