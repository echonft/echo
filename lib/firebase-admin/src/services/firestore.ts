import { Firestore, getFirestore } from 'firebase-admin/firestore'
import { auth } from './auth'

export function firestore(): Firestore {
  return getFirestore(auth().app)
}
