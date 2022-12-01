import { adminFirebaseApp } from './admin-firebase-app'
import { Firestore, getFirestore } from 'firebase-admin/firestore'

export function firestore(): Firestore {
  return getFirestore(adminFirebaseApp())
}
