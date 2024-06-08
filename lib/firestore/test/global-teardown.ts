// noinspection JSUnusedGlobalSymbols
import 'tsconfig-paths/register'
import { terminateFirestore } from '@echo/firestore/services/terminate-firestore'

export default async function () {
  await terminateFirestore()
}
