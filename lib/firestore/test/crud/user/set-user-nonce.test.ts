import { findUserById } from '../../../src/crud/user/find-user-by-id'
import { setUserNonce } from '../../../src/crud/user/set-user-nonce'
import { updateUser } from '../../../src/crud/user/update-user'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

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
