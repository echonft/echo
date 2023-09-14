import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { setUserNftsUpdated } from '@echo/firestore/crud/user/set-user-nfts-updated'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { Dayjs } from 'dayjs'

describe('CRUD - user - setUserNftsUpdated', () => {
  let initialNftsUpdatedAt: Dayjs
  const id = '6rECUMhevHfxABZ1VNOm'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const user = await findUserById(id)
    initialNftsUpdatedAt = user!.nftsUpdatedAt
  })
  afterEach(async () => {
    await updateUser(id, { nftsUpdatedAt: initialNftsUpdatedAt })
  })

  it('setUserUpdatedAt', async () => {
    await setUserNftsUpdated(id)
    const updatedUser = await findUserById(id)
    expectDateIsNow(updatedUser!.nftsUpdatedAt)
  })
})
