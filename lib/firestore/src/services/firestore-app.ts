import { getApp } from 'firebase-admin/app'
import { Firestore, getFirestore } from 'firebase-admin/firestore'

export function firestoreApp(): Firestore {
  return getFirestore(getApp())
}
