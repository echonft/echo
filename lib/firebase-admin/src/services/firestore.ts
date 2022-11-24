import { getAdminFirebase } from './app'
import { Firestore, getFirestore } from 'firebase-admin/firestore'

export function firestore(): Firestore {
  return getFirestore(getAdminFirebase())
}
