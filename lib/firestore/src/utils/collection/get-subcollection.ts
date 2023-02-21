import { collection, CollectionReference, DocumentData, DocumentReference } from 'firebase/firestore'

export const getSubcollection = <T extends DocumentData>(
  reference: DocumentReference,
  path: string,
  ...pathSegments: string[]
) => collection(reference, path, ...pathSegments) as CollectionReference<T>
