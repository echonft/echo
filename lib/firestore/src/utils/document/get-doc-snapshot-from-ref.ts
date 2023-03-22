import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { DocumentData, DocumentReference, getDoc } from 'firebase/firestore'
import { andThen, pipe, unless } from 'ramda'

export const getDocSnapshotFromRef = <T extends DocumentData>(
  ref: DocumentReference<T>
): Promise<FirestoreSnapshot<T>> =>
  pipe(
    getDoc,
    andThen(
      unless(
        (snapshot) => snapshot.exists(),
        (_snapshot) => {
          throw new Error('Not found')
        }
      )
    )
  )(ref)
