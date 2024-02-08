import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { clearDb } from '@echo/firestore-test/clear-db'
import { initializeDb } from '@echo/firestore-test/initialize-db'
import { initializeTestFirebase } from '@echo/firestore-test/initialize-test-firebase'

void (async function () {
  await initializeTestFirebase()
  await clearDb()
  await initializeDb()
  await terminateFirestore()
})()
