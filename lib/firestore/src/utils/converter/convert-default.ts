import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreConverter } from '../../types/converter/firestore-converter'
import { FirestoreRootCollectionDocumentData } from '../../types/model/data/abstract/firestore-root-collection-document-data'
import { defaultConverter } from './default-converter'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { call, converge, head, identity, pipe, split } from 'ramda'

export const convertDefault = <T extends DocumentData, V extends FirestoreRootCollectionDocumentData>(
  snapshot: FirestoreSnapshot<T>
): Promise<V> =>
  converge(call, [
    pipe<[FirestoreSnapshot<T>], DocumentReference<T>, string, string[], string, FirestoreConverter<T, V>>(
      (snapshot) => snapshot.ref,
      (ref) => ref.path,
      split('/'),
      head,
      defaultConverter
    ),
    identity
  ])(snapshot)
