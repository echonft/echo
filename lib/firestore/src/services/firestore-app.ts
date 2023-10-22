import { getApp } from 'firebase-admin/app'
import { type Firestore, getFirestore } from 'firebase-admin/firestore'

export function firestoreApp(): Firestore {
  return getFirestore(getApp())
}
