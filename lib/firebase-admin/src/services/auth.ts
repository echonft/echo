import { adminFirebaseApp } from './admin-firebase-app'
import { Auth, getAuth } from 'firebase-admin/auth'

export function auth(): Auth {
  return getAuth(adminFirebaseApp())
}
