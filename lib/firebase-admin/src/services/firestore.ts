import { auth } from './auth'
import { Firestore, getFirestore } from 'firebase-admin/firestore'

// FIXME I think that's the leak problem, it seems to always instantiate a new firestore
export function firestore(): Firestore {
  return getFirestore(auth().app)
}
