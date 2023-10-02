import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { clearDb } from '@test-utils/clear-db'
import { initializeDb } from '@test-utils/initialize-db'

void (async function () {
  initializeFirebase()
  await clearDb()
  await initializeDb()
  await terminateFirestore()
})()
