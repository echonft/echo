import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - user - findUserByUsername', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserByUsername('not-found')
    expect(user).toBeUndefined()
  })
  it('returns the user with the given username', async () => {
    const user = await getUserByUsername(userMockJohnnyUsername())
    expect(user).toBeDefined()
    expect(omit(['createdAt', 'updatedAt'], getUserDocumentDataMockByUsername(user!.username))).toStrictEqual(
      omit<UserDocumentData, 'createdAt' | 'updatedAt'>(['createdAt', 'updatedAt'], user!)
    )
  })
})
