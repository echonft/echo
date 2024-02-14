import { clearDb } from '@echo/firestore/crud/clear-db'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'

void (async function () {
  initializeFirebase()
  await clearDb()
  await terminateFirestore()
})()
