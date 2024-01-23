import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { getAuthUser } from '@echo/frontend/lib/auth/get-auth-user'
import { unstable_setRequestLocale } from 'next-intl/server'
import { isNil } from 'ramda'

interface Config {
  initializeFirebase?: true
  getAuthUser?: true
}
export async function initializeServerComponent(config?: Config) {
  unstable_setRequestLocale('en')
  if (isNil(config)) {
    return undefined
  }
  initializeFirebase()
  if (config.getAuthUser) {
    return await getAuthUser()
  }
  return undefined
}
