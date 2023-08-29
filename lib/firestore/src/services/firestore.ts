import { getApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

export function firestore() {
  return getFirestore(getApp())
}
