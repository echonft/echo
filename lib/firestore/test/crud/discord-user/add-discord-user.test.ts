import { CollectionName } from '@echo/firestore/constants/collection-name'
import { discordUserDataConverter } from '@echo/firestore/converters/discord-user/discord-user-data-converter'
import { addDiscordUser, NewFirestoreDiscordUser } from '@echo/firestore/crud/discord-user/add-discord-user'
import { deleteDiscordUser } from '@echo/firestore/crud/discord-user/delete-discord-user'
import { findDiscordUserByUserId } from '@echo/firestore/crud/discord-user/find-discord-user-by-user-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import { getDiscordUserMockById } from '@echo/firestore-mocks/discord-user/get-discord-user-mock-by-id'
import { getDiscordUserMockByUserId } from '@echo/firestore-mocks/discord-user/get-discord-user-mock-by-user-id'
import { expectDateIsNow } from '@echo/test-utils/expect-date-is-now'
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals'
import { assertDiscordUsers } from '@test-utils/discord-user/assert-discord-users'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import { omit } from 'ramda'

describe('CRUD - discord-user - addDiscordUser', () => {
  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertDiscordUsers()
    await tearDownRemoteFirestoreTests()
  })

  it('throws if the userId does not exist in the db', async () => {
    const discordUserMock = getDiscordUserMockById('be5KGz2BfBRYbA1mCKQp')
    const newDiscordUserData = omit(['id', 'userId', 'updatedAt'], discordUserMock) as NewFirestoreDiscordUser
    await expect(addDiscordUser('not-found', newDiscordUserData)).rejects.toBeDefined()
  })

  it('throws if there is already a discord user for the userId', async () => {
    const discordUserMock = getDiscordUserMockByUserId('6rECUMhevHfxABZ1VNOm')
    const newDiscordUserData = omit(['id', 'userId', 'updatedAt'], discordUserMock) as NewFirestoreDiscordUser
    await expect(addDiscordUser('6rECUMhevHfxABZ1VNOm', newDiscordUserData)).rejects.toBeDefined()
  })

  it('add a discord user', async () => {
    const existingDiscordUser = await findDiscordUserByUserId('6rECUMhevHfxABZ1VNOm')
    await deleteDiscordUser(existingDiscordUser!.id)
    const discordUserMock = getDiscordUserMockById('be5KGz2BfBRYbA1mCKQp')
    const newDiscordUserData = omit(['id', 'userId', 'updatedAt'], discordUserMock) as NewFirestoreDiscordUser
    const id = await addDiscordUser('6rECUMhevHfxABZ1VNOm', newDiscordUserData)
    const newUser = await findDiscordUserByUserId('6rECUMhevHfxABZ1VNOm')
    await deleteDiscordUser(id)
    const existingDiscordUserRef = firestoreApp().collection(CollectionName.DISCORD_USERS).doc(existingDiscordUser!.id)
    await existingDiscordUserRef.set(discordUserDataConverter.toFirestore(existingDiscordUser!))
    expect(newUser!.discordAvatar).toStrictEqual(discordUserMock.discordAvatar)
    expect(newUser!.discordBanner).toStrictEqual(discordUserMock.discordBanner)
    expect(newUser!.discordId).toStrictEqual(discordUserMock.discordId)
    expect(newUser!.discordUsername).toStrictEqual(discordUserMock.discordUsername)
    expect(newUser!.userId).toStrictEqual(discordUserMock.userId)
    expectDateIsNow(newUser!.updatedAt)
  })
})
