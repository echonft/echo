// noinspection JSUnusedGlobalSymbols
import 'tsconfig-paths/register'
import { getFirebaseServiceAccount } from '@echo/firestore/services/get-firebase-service-account'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { clearDb } from '@echo/firestore/utils/clear-db'
import { initializeDb } from '@echo/firestore/utils/initialize-db'
import type { Config } from '@jest/types'

export default async function (_globalConfig: Config.GlobalConfig, _projectConfig: Config.ProjectConfig) {
  const serviceAccount = await getFirebaseServiceAccount()
  await initializeFirebase({ serviceAccount })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.serviceAccount = serviceAccount
  await clearDb()
  await initializeDb()
  await terminateFirestore()
}
