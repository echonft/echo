import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { clearDb } from '@echo/firestore/utils/clear-db'
import { initializeDb } from '@echo/firestore/utils/initialize-db'
import { beforeAll } from '@jest/globals'
import type { ServiceAccount } from 'firebase-admin/app'
import { prop } from 'ramda'

beforeAll(async () => {
  const clientEmail: string = prop('clientEmail', global)
  const projectId: string = prop('projectId', global)
  const privateKey: string = prop('privateKey', global)
  const serviceAccount = { clientEmail, projectId, privateKey } as ServiceAccount
  await initializeFirebase({ serviceAccount })
  await clearDb()
  await initializeDb()
})
