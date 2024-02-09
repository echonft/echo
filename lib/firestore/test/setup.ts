import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { afterAll, beforeAll } from '@jest/globals'

beforeAll(() => {
  initializeFirebase()
})
afterAll(async () => {
  await terminateFirestore()
})
