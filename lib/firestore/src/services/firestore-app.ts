import { getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export function firestoreApp() {
  return getFirestore(getApp())
}
