import { getCredential } from '@echo/firestore/services/get-credential'
import { isNonEmptyArray } from '@echo/utils/fp/is-non-empty-array'
import { getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore, initializeFirestore as firebaseInitializeFirestore } from 'firebase-admin/firestore'
import { head } from 'ramda'

export function initializeFirebase() {
  const apps = getApps()
  if (isNonEmptyArray(apps)) {
    return getFirestore(head(apps))
  }
  const credential = getCredential()
  const firestore = firebaseInitializeFirestore(initializeApp(credential))
  firestore.settings({ ignoreUndefinedProperties: true })
  return firestore
}
