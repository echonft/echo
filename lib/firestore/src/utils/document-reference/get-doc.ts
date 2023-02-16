import { getDocRef } from './get-doc-ref'
import { DocumentData, getDoc as firestoreGetDoc } from 'firebase/firestore'

export const getDoc = <T extends DocumentData>(path: string, ...pathSegments: string[]) =>
  firestoreGetDoc<T>(getDocRef<T>(path, ...pathSegments))
