import { getAdminFirebase } from './app'
import { Auth, getAuth } from 'firebase-admin/auth'

export function auth(): Auth {
  return getAuth(getAdminFirebase())
}
