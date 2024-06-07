import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/user/get-user-document-data-mock-by-username'
import { getUserByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - user - findUserByDiscordId', () => {
  it('returns undefined if the user is not found', async () => {
    const user = await getUserByDiscordId('not-found')
    expect(user).toBeUndefined()
  })

  it('returns the user with the given id', async () => {
    const user = await getUserByDiscordId('462798252543049728')
    expect(user).toBeDefined()
    expect(omit(['createdAt', 'updatedAt'], getUserDocumentDataMockByUsername(user!.username))).toStrictEqual(
      omit<UserDocumentData, 'createdAt' | 'updatedAt'>(['createdAt', 'updatedAt'], user!)
    )
  })
})
