import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { afterAll, beforeAll } from '@jest/globals'
import type { ServiceAccount } from 'firebase-admin/app'
import { pick } from 'ramda'

beforeAll(async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const credentials = pick(['clientEmail', 'privateKey'], global) as Omit<ServiceAccount, 'projectId'>
  await initializeFirebase(credentials)
})
afterAll(async () => {
  await terminateFirestore()
})
