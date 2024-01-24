import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { expectUserDocumentDataToEqualMock } from '@echo/firestore-test/user/expect-user-document-data-to-equal-mock'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByUsername', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await tearDownRemoteFirestoreTests()
  })

  it('returns undefined if the user is not found', async () => {
    const user = await findUserByUsername('not-found')
    expect(user).toBeUndefined()
  })

  it('returns the user with the given username', async () => {
    const user = await findUserByUsername('johnnycagewins')
    expectUserDocumentDataToEqualMock(user)
  })
})
