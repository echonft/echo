import serviceAccount from '../service-accout-key.json'
import { ServiceAccount } from 'firebase-admin'
import { App, cert, getApp, getApps, initializeApp } from 'firebase-admin/app'
import { isEmpty } from 'ramda'

/**
 * Returns an admin logged Firebase
 */
export const adminFirebaseApp = (): App =>
  isEmpty(getApps())
    ? initializeApp({
        credential: cert(serviceAccount as ServiceAccount)
      })
    : getApp()
