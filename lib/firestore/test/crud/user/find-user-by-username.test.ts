import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { expectUserDocumentDataToEqualMock } from '@echo/firestore-test/user/expect-user-document-data-to-equal-mock'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserByUsername', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserByUsername('not-found')
    expect(user).toBeUndefined()
  })
  it('returns the user with the given username', async () => {
    const user = await getUserByUsername(USER_MOCK_JOHNNY_USERNAME)
    expectUserDocumentDataToEqualMock(user)
  })
})
