import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { getUserMockById } from '@echo/firestore-mocks/get-user-mock-by-id'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - user - findUserById', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the user is not found', async () => {
    const user = await findUserById('not-found')
    expect(user).toBeUndefined()
  })

  it('returns the user with the given id', async () => {
    const user = await findUserById('oE6yUEQBPn7PZ89yMjKn')
    expect(user).toStrictEqual(getUserMockById('oE6yUEQBPn7PZ89yMjKn'))
  })
})
