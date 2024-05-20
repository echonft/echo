import { DocumentSnapshot } from 'firebase-admin/firestore'

export type NonEmptyDocumentSnapshot<T> = Omit<DocumentSnapshot<T>, 'data'> & { data: () => T }
