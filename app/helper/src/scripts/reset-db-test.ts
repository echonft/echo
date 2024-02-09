import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { clearDb } from '@echo/firestore-test/clear-db'
import { initializeDb } from '@echo/firestore-test/initialize-db'

void (async function () {
  initializeFirebase()
  await clearDb()
  await initializeDb()
  await terminateFirestore()
})()
