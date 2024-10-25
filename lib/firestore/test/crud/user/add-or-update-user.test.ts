import { addOrUpdateUser } from '@echo/firestore/crud/user/add-or-update-user'
import { getUserSnapshotByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserDocumentDataMockByUsername } from '@echo/firestore/mocks/db-model/user/get-user-document-data-mock-by-username'
import type { UserDiscordProfile } from '@echo/model/types/user/user-discord-profile'
import { deleteUser } from '@echo/test/firestore/crud/user/delete-user'
import { updateUser } from '@echo/test/firestore/crud/user/update-user'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNotNil } from 'ramda'

describe('CRUD - user - addOrUpdateUser', () => {
  let newUserId: Nullable<string>
  let updatedUsername: Nullable<string>
  beforeEach(() => {
    newUserId = undefined
    updatedUsername = undefined
  })
  afterEach(async () => {
    if (isNotNil(updatedUsername)) {
      await updateUser(updatedUsername, getUserDocumentDataMockByUsername(updatedUsername))
    }
    if (isNotNil(newUserId)) {
      await deleteUser(newUserId)
    }
  })

  it('adds the user if it does not exist in the database', async () => {
    const discordProfile: UserDiscordProfile = {
      id: 'discord-id',
      username: 'discord-username',
      avatarUrl: 'discord-avatar-url',
      bannerColor: '#ffffff',
      discriminator: '0'
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
    const existingUser = await getUserById('6rECUMhevHfxABZ1VNOm')
    expect(existingUser).toBeDefined()
    updatedUsername = existingUser!.username
    const discordProfile: UserDiscordProfile = {
      id: existingUser!.discord.id,
      username: 'discord-username',
      avatarUrl: 'discord-avatar-url',
      bannerColor: '#ffffff',
      discriminator: '0'
    }
    await addOrUpdateUser(discordProfile)
    const foundUser = (await getUserByUsername(updatedUsername))!
    expect(foundUser.discord).toStrictEqual(assoc('id', existingUser!.discord.id, discordProfile))
  })
})
