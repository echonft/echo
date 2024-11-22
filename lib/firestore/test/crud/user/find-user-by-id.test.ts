import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
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
