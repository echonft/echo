import { addOrUpdateUser } from '@echo/firestore/crud/user/add-or-update-user'
import { getUserSnapshotByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import type { UserDocument } from '@echo/firestore/types/model/user-document'
import type { Username } from '@echo/model/types/username'
import { deleteUser } from '@echo/test/firestore/crud/user/delete-user'
import { resetUser } from '@echo/test/firestore/crud/user/reset-user'
import { userDocumentMockJohnnyId } from '@echo/test/firestore/initialize-db'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNotNil } from 'ramda'

describe('CRUD - user - addOrUpdateUser', () => {
  let newUserId: Nullable<string>
  let updatedUsername: Nullable<Username>
  beforeEach(() => {
    newUserId = undefined
    updatedUsername = undefined
  })
  afterEach(async () => {
    if (isNotNil(updatedUsername)) {
      await resetUser(updatedUsername)
    }
    if (isNotNil(newUserId)) {
      await deleteUser(newUserId)
    }
  })

  it('adds the user if it does not exist in the database', async () => {
    const discordProfile: UserDocument['discord'] = {
      id: 'discord-id',
      username: 'discord-username',
      avatarUrl: 'discord-avatar-url',
      globalName: 'globalName'
    }
    await addOrUpdateUser(discordProfile)
    const snapshot = (await getUserSnapshotByDiscordId('discord-id'))!
    newUserId = snapshot.id
    expect(newUserId).toBeDefined()
    const foundUser = (await getUserById(newUserId))!
    expect(foundUser.discord).toStrictEqual(discordProfile)
    expect(foundUser.username).toStrictEqual(discordProfile.username)
  })

  it('updates the user if it exists in the database', async () => {
    const existingUser = await getUserById(userDocumentMockJohnnyId)
    expect(existingUser).toBeDefined()
    updatedUsername = existingUser!.username
    const discordProfile: UserDocument['discord'] = {
      id: existingUser!.discord.id,
      username: 'discord-username',
      avatarUrl: 'discord-avatar-url'
    }
    await addOrUpdateUser(discordProfile)
    const foundUser = (await getUserByUsername(updatedUsername))!
    expect(foundUser.discord).toStrictEqual(assoc('id', existingUser!.discord.id, discordProfile))
  })
})
