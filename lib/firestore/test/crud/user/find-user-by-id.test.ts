import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { getUserById } from '@echo/test/firestore/crud/user/get-user-by-id'
import { userDocumentMockJohnnyId } from '@echo/test/firestore/mocks'
import { describe, expect, it } from '@jest/globals'

describe('CRUD - user - findUserById', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserById('not-found')
    expect(user).toBeUndefined()
  })
  it('returns the user with the given id', async () => {
    const user = await getUserById(userDocumentMockJohnnyId)
    expect(user).toBeDefined()
    expect(user).toStrictEqual(userDocumentMockJohnny)
  })
})
