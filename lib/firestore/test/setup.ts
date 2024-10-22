import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { clearDb } from '@echo/test/firestore/clear-db'
import { initializeDb } from '@echo/test/firestore/initialize-db'
import { beforeAll, expect } from '@jest/globals'
import dayjs from 'dayjs'
import type { ServiceAccount } from 'firebase-admin/app'
import { always, ifElse, isNil, partialRight, pipe, when } from 'ramda'

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
  toBeMsSlug(received: string) {
    const date = pipe(
      partialRight(parseInt, [10]),
      ifElse(
        isNaN,
        always(undefined),
        pipe(
          (date) => dayjs(date),
          when((date) => !date.isValid(), always(undefined))
        )
      )
    )(received)
    const before = dayjs().subtract(1, 'minute').valueOf()
    const after = dayjs().add(1, 'minute').valueOf()
    const pass = !isNil(date) && date.isAfter(before) && date.isBefore(after)
    return {
      pass,
      message: () =>
        `expected ${received} to${pass ? ' not' : ''} be ~now: between ${before.valueOf()} and ${after.valueOf()}`
    }
  }
})
