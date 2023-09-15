import { CollectionName } from '@echo/firestore/constants/collection-name'
import { userDiscordGuildDataConverter } from '@echo/firestore/converters/user-discord-guild-data-converter'
import {
  addUserDiscordGuild,
  NewFirestoreUserDiscordGuild
} from '@echo/firestore/crud/user-discord-guild/add-user-discord-guild'
import { deleteUserDiscordGuild } from '@echo/firestore/crud/user-discord-guild/delete-user-discord-guild'
import { findUserDiscordGuildByUserId } from '@echo/firestore/crud/user-discord-guild/find-user-discord-guild-by-user-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getUserDiscordGuildMockById } from '@echo/firestore-mocks/get-user-discord-guild-mock-by-id'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { omit } from 'ramda'

describe('CRUD - discord-user - addDiscordUser', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('throws if the userId does not exist in the db', async () => {
    const userDiscordGuild = getUserDiscordGuildMockById('3gWDBihHVUQLJxbiJOIp')
    const newUserDiscordGuildData = omit(
      ['id', 'userId', 'updatedAt'],
      userDiscordGuild
    ) as NewFirestoreUserDiscordGuild
    await expect(addUserDiscordGuild('not-found', newUserDiscordGuildData)).rejects.toBeDefined()
  })

  it('throws if there is already a user discord guild for the userId', async () => {
    const userDiscordGuild = getUserDiscordGuildMockById('3gWDBihHVUQLJxbiJOIp')
    const newUserDiscordGuildData = omit(
      ['id', 'userId', 'updatedAt'],
      userDiscordGuild
    ) as NewFirestoreUserDiscordGuild
    await expect(addUserDiscordGuild('oE6yUEQBPn7PZ89yMjKn', newUserDiscordGuildData)).rejects.toBeDefined()
  })

  it('add user discord guilds', async () => {
    const existingUserDiscordGuild = await findUserDiscordGuildByUserId('oE6yUEQBPn7PZ89yMjKn')
    await deleteUserDiscordGuild(existingUserDiscordGuild!.id)
    const userDiscordGuild = getUserDiscordGuildMockById('3gWDBihHVUQLJxbiJOIp')
    const newUserDiscordGuildData = omit(
      ['id', 'userId', 'updatedAt'],
      userDiscordGuild
    ) as NewFirestoreUserDiscordGuild
    const id = await addUserDiscordGuild('oE6yUEQBPn7PZ89yMjKn', newUserDiscordGuildData)
    const newUserDiscordGuild = await findUserDiscordGuildByUserId('oE6yUEQBPn7PZ89yMjKn')
    await deleteUserDiscordGuild(id)
    const existingUserDiscordGuildRef = firestoreApp()
      .collection(CollectionName.USER_DISCORD_GUILDS)
      .doc(existingUserDiscordGuild!.id)
    await existingUserDiscordGuildRef.set(userDiscordGuildDataConverter.toFirestore(existingUserDiscordGuild!))
    expect(newUserDiscordGuild!.guilds).toEqual(existingUserDiscordGuild!.guilds)
    expect(newUserDiscordGuild!.userId).toStrictEqual(existingUserDiscordGuild!.userId)
    expectDateIsNow(newUserDiscordGuild!.updatedAt)
  })
})
