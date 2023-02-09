import { QuerySnapshot } from 'firebase/firestore'

export const isQuerySnapshotEmpty = <T>(snapshot: QuerySnapshot<T>): boolean => snapshot.empty
