import 'tsconfig-paths/register'
import { getFirebaseServiceAccount } from '@echo/firestore/services/get-firebase-service-account'
import type { Config } from '@jest/types'

export default async function (_globalConfig: Config.GlobalConfig, _projectConfig: Config.ProjectConfig) {
  const serviceAccount = await getFirebaseServiceAccount()
  global.clientEmail = serviceAccount.clientEmail
  global.projectId = serviceAccount.projectId
  global.privateKey = serviceAccount.privateKey
}
