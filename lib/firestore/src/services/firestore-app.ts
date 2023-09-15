import { getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import type { Firestore } from 'firebase-admin/lib/firestore'

export function firestoreApp(): Firestore {
  return getFirestore(getApp())
}
