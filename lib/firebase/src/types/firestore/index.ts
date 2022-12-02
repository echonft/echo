import {
  CollectionReference as FirebaseAdminCollectionReference,
  DocumentData as FirebaseAdminDocumentData,
  DocumentReference as FirebaseAdminDocumentReference,
  DocumentSnapshot as FirebaseAdminDocumentSnapshot,
  Query as FirebaseAdminQuery,
  QueryDocumentSnapshot as FirebaseAdminQueryDocumentSnapshot
} from '@google-cloud/firestore'
import {
  CollectionReference as FirebaseCollectionReference,
  DocumentData as FirebaseDocumentData,
  DocumentReference as FirebaseDocumentReference,
  DocumentSnapshot as FirebaseDocumentSnapshot,
  Query as FirebaseQuery,
  QueryDocumentSnapshot as FirebaseQueryDocumentSnapshot
} from 'firebase/firestore'

export type CollectionReference<T extends DocumentData> =
  | FirebaseCollectionReference<T>
  | FirebaseAdminCollectionReference<T>
export type DocumentData = FirebaseDocumentData | FirebaseAdminDocumentData
export type DocumentReference<T extends DocumentData> = FirebaseDocumentReference<T> | FirebaseAdminDocumentReference<T>
export type DocumentSnapshot<T extends DocumentData> = FirebaseDocumentSnapshot<T> | FirebaseAdminDocumentSnapshot<T>
export type QueryDocumentSnapshot<T extends DocumentData> =
  | FirebaseQueryDocumentSnapshot<T>
  | FirebaseAdminQueryDocumentSnapshot<T>
export type Query<T extends DocumentData> = FirebaseQuery<T> | FirebaseAdminQuery<T>
