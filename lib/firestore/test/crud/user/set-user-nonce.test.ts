import { findUserById } from '../../../src/crud/user/find-user-by-id'
import { setUserNonce } from '../../../src/crud/user/set-user-nonce'
import { updateUser } from '../../../src/crud/user/update-user'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

describe('CRUD - user - setUserNonce', () => {
  let initialNonce: string
  const id = 'oE6yUEQBPn7PZ89yMjKn'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const user = await findUserById(id)
    initialNonce = user!.nonce!
  })
  afterEach(async () => {
    await updateUser(id, { nonce: initialNonce })
  })

  it('setUserNonce', async () => {
    const nonce = await setUserNonce(id)
    const updatedUser = await findUserById(id)
    expect(updatedUser!.nonce).toEqual(nonce)
  })
})
