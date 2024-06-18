import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { beforeAll } from '@jest/globals'
import type { ServiceAccount } from 'firebase-admin/app'
import { prop } from 'ramda'

beforeAll(async () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const clientEmail: string = prop('clientEmail', global)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const projectId: string = prop('projectId', global)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const privateKey: string = prop('privateKey', global)
  const serviceAccount = { clientEmail, projectId, privateKey } as ServiceAccount
  await initializeFirebase({ serviceAccount })
})
