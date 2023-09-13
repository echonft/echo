import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { setUserNonce } from '@echo/firestore/crud/user/set-user-nonce'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - user - setUserNonce', () => {
  let initialNonce: string
  const id = 'oE6yUEQBPn7PZ89yMjKn'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const user = await findUserById(id)
    initialNonce = user!.nonce!
  })
  afterEach(async () => {
    await updateUser(id, { nonce: initialNonce })
  })

  it('setUserNonce', async () => {
    await setUserNonce(id, 'nonce')
    const updatedUser = await findUserById(id)
    expect(updatedUser!.nonce).toEqual('nonce')
  })
})
