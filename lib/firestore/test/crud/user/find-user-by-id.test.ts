import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { userMockJohnnyId } from '@echo/firestore/mocks/user/user-document-data-mock'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - user - findUserById', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserById('not-found')
    expect(user).toBeUndefined()
  })
  it('returns the user with the given id', async () => {
    const user = await getUserById(userMockJohnnyId())
    expect(user).toBeDefined()
    expect(omit(['createdAt', 'updatedAt'], getUserDocumentDataMockByUsername(user!.username))).toStrictEqual(
      omit<UserDocumentData, 'createdAt' | 'updatedAt'>(['createdAt', 'updatedAt'], user!)
    )
  })
})
