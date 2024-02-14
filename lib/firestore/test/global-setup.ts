import 'tsconfig-paths/register'
import { clearDb } from '@echo/firestore/crud/clear-db'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { initializeDb } from '@echo/firestore-test/initialize-db'

export default async function () {
  initializeFirebase()
  await clearDb()
  await initializeDb()
  await terminateFirestore()
}
