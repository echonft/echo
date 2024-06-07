// noinspection JSUnusedGlobalSymbols
import 'tsconfig-paths/register'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { clearDb } from '@echo/firestore/utils/clear-db'
import { initializeDb } from '@echo/firestore/utils/initialize-db'

export default async function () {
  initializeFirebase()
  await clearDb()
  await initializeDb()
  await terminateFirestore()
}
