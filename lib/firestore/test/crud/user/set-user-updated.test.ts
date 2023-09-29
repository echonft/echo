import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { setUserUpdated } from '@echo/firestore/crud/user/set-user-updated'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, afterEach, beforeAll, describe, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { assertUsers } from '@test-utils/user/assert-users'
import dayjs from 'dayjs'

describe('CRUD - user - setUserUpdated', () => {
  const user = getUserMockById('6rECUMhevHfxABZ1VNOm')

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertUsers()
    await tearDownRemoteFirestoreTests()
  })

  afterEach(async () => {
    await updateUser(user.id, { updatedAt: user.updatedAt })
  })

  it('setUserUpdatedAt', async () => {
    await setUserUpdated(user.id)
    const updatedUser = (await findUserByUsername(user.username))!
    expectDateIsNow(dayjs.unix(updatedUser.updatedAt))
  })
})
