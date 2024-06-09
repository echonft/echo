// noinspection JSUnusedGlobalSymbols
import 'tsconfig-paths/register'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'
import { clearDb } from '@echo/firestore/utils/clear-db'
import { initializeDb } from '@echo/firestore/utils/initialize-db'
import { getSecret } from '@echo/utils/services/secret-manager'
import { privateKeySchema } from '@echo/utils/validators/private-key-schema'
import type { Config } from '@jest/types'
import { andThen, pipe } from 'ramda'

export default async function (_globalConfig: Config.GlobalConfig, _projectConfig: Config.ProjectConfig) {
  const clientEmail = await getSecret('FIREBASE_CLIENT_EMAIL')
  const privateKey = await pipe(
    getSecret,
    andThen((key) => privateKeySchema.parse(key))
  )('FIREBASE_PRIVATE_KEY')
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
