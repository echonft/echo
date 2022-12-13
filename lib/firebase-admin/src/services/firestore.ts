import { auth } from './auth'
import { Firestore, getFirestore } from 'firebase-admin/firestore'

export function firestore(): Firestore {
  return getFirestore(auth().app)
}
