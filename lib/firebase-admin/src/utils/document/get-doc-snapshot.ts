import { firestore } from '../../services'
import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { getDocSnapshotFromRef } from './get-doc-snapshot-from-ref'
import { DocumentData, DocumentReference } from '@google-cloud/firestore'

export const getDocSnapshot = <T extends DocumentData>(
  collectionPath: string,
  documentPath: string
): Promise<FirestoreSnapshot<T>> =>
  getDocSnapshotFromRef<T>(firestore().collection(collectionPath).doc(documentPath) as DocumentReference<T>)
