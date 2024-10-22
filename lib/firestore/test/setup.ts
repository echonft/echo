import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { clearDb } from '@echo/test/firestore/clear-db'
import { initializeDb } from '@echo/test/firestore/initialize-db'
import { beforeAll, expect } from '@jest/globals'
import dayjs from 'dayjs'
import type { ServiceAccount } from 'firebase-admin/app'

beforeAll(async () => {
  const clientEmail: string = global.clientEmail
  const projectId: string = global.projectId
  const privateKey: string = global.privateKey
  const serviceAccount = { clientEmail, projectId, privateKey } as ServiceAccount
  await initializeFirebase({ serviceAccount })
  await clearDb()
  await initializeDb()
})

expect.extend({
  toBeNow(received: number) {
    const before = dayjs().subtract(1, 'minute')
    const after = dayjs().add(1, 'minute')
    const pass = dayjs.unix(received).isAfter(before) && dayjs.unix(received).isBefore(after)
    return {
      pass,
      message: () =>
        `expected ${received} to${pass ? ' not' : ''} be ~now: between ${before.unix()} and ${after.unix()}`
    }
  }
})
