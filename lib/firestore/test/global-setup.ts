// noinspection JSUnusedGlobalSymbols
import 'tsconfig-paths/register'
import { getFirebaseCredentials } from '@echo/firestore/services/get-firebase-credentials'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { clearDb } from '@echo/firestore/utils/clear-db'
import { initializeDb } from '@echo/firestore/utils/initialize-db'
import type { Config } from '@jest/types'

export default async function (_globalConfig: Config.GlobalConfig, _projectConfig: Config.ProjectConfig) {
  const { clientEmail, privateKey } = await getFirebaseCredentials()
  await initializeFirebase({ clientEmail, privateKey })
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.clientEmail = clientEmail
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.privateKey = privateKey
  await clearDb()
  await initializeDb()
  await terminateFirestore()
}
