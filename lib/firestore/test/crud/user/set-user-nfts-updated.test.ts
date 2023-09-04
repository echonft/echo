import { findUserById } from '../../../src/crud/user/find-user-by-id'
import { setUserNftsUpdated } from '../../../src/crud/user/set-user-nfts-updated'
import { updateUser } from '../../../src/crud/user/update-user'
import { expectDateIsNow } from '../../test-utils/expect-date-is-now'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, it } from '@jest/globals'
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
