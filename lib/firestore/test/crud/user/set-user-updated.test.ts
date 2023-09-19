import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { setUserUpdated } from '@echo/firestore/crud/user/set-user-updated'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, it } from '@jest/globals'
import { assertUsers } from '@test-utils/assert-users'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { Dayjs } from 'dayjs'

describe('CRUD - user - setUserUpdated', () => {
  let initialUpdatedAt: Dayjs
  const id = '6rECUMhevHfxABZ1VNOm'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertUsers()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const user = await findUserById(id)
    initialUpdatedAt = user!.updatedAt
  })
  afterEach(async () => {
    await updateUser(id, { updatedAt: initialUpdatedAt })
  })

  it('setUserUpdatedAt', async () => {
    await setUserUpdated(id)
    const updatedUser = await findUserById(id)
    expectDateIsNow(updatedUser!.updatedAt)
  })
})
