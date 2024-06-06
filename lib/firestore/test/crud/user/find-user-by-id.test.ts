import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { userMockJohnnyId } from '@echo/firestore-mocks/user/user-document-data-mock'
import { expectUserDocumentDataToEqualMock } from '@echo/firestore-test/user/expect-user-document-data-to-equal-mock'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserById', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserById('not-found')
    expect(user).toBeUndefined()
  })
  // eslint-disable-next-line jest/expect-expect
  it('returns the user with the given id', async () => {
    const user = await getUserById(userMockJohnnyId())
    expectUserDocumentDataToEqualMock(user)
  })
})
