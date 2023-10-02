import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { clearDb } from '@test-utils/clear-db'
import { initializeDb } from '@test-utils/initialize-db'
import { initializeTestFirebase } from '@test-utils/initialize-test-firebase'

void (async function () {
  await initializeTestFirebase()
  await clearDb()
  await initializeDb()
  await terminateFirestore()
})()
