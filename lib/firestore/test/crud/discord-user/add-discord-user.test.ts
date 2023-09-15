import { CollectionName } from '@echo/firestore/constants/collection-name'
import { discordUserDataConverter } from '@echo/firestore/converters/discord-user-data-converter'
import { addDiscordUser } from '@echo/firestore/crud/discord-user/add-discord-user'
import { deleteDiscordUser } from '@echo/firestore/crud/discord-user/delete-discord-user'
import { findDiscordUserByUserId } from '@echo/firestore/crud/discord-user/find-discord-user-by-user-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getDiscordUserMockById } from '@echo/firestore-mocks/get-discord-user-mock-by-id'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { assoc } from 'ramda'

describe('CRUD - discord-user - addDiscordUser', () => {
  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)

  it('throws if the userId does not exist in the db', async () => {
    const discordUserMock = getDiscordUserMockById('be5KGz2BfBRYbA1mCKQp')
    await expect(addDiscordUser(assoc('userId', 'not-found', discordUserMock))).rejects.toBeDefined()
  })

  it('throws if there is already a discord user for the userId', async () => {
    const discordUserMock = getDiscordUserMockById('be5KGz2BfBRYbA1mCKQp')
    await expect(addDiscordUser(discordUserMock)).rejects.toBeDefined()
  })

  it('add a discord user', async () => {
    const existingDiscordUser = await findDiscordUserByUserId('6rECUMhevHfxABZ1VNOm')
    await deleteDiscordUser(existingDiscordUser!.id)
    const discordUserMock = getDiscordUserMockById('be5KGz2BfBRYbA1mCKQp')
    const id = await addDiscordUser(discordUserMock)
    const newUser = await findDiscordUserByUserId('6rECUMhevHfxABZ1VNOm')
    await deleteDiscordUser(id)
    const existingDiscordUserRef = firestoreApp().collection(CollectionName.DISCORD_USERS).doc(existingDiscordUser!.id)
    await existingDiscordUserRef.set(discordUserDataConverter.toFirestore(existingDiscordUser!))
    expect(newUser!.discordAvatar).toStrictEqual(discordUserMock.discordAvatar)
    expect(newUser!.discordBanner).toStrictEqual(discordUserMock.discordBanner)
    expect(newUser!.discordId).toStrictEqual(discordUserMock.discordId)
    expect(newUser!.discordUsername).toStrictEqual(discordUserMock.discordUsername)
    expect(newUser!.discordGuilds).toStrictEqual(discordUserMock.discordGuilds)
    expect(newUser!.userId).toStrictEqual(discordUserMock.userId)
    expectDateIsNow(newUser!.updatedAt)
  })
})
