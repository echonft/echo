import { buildUser } from '../../../src/builders/user/build-user'
import { FirestoreUser } from '../../../src/types/model/collections/user/firestore-user'
import { FirestoreUserPrototype } from '../../../src/types/prototypes/user/firestore-user-prototype'
import { discordGuildReferences } from '../../mocks/discord-guild/discord-guild-reference'
import { describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('builders - user - buildUser', () => {
  const mockUserPrototype: FirestoreUserPrototype = {
    discordGuildIds: [],
    discordId: 'test',
    discordBanner: 'test.png',
    discordUsername: 'testy',
    discordAvatar: 'avatar.png'
  }

  const mockUser: FirestoreUser = {
    discordId: 'test',
    discordBanner: 'test.png',
    discordUsername: 'testy',
    discordAvatar: 'avatar.png',
    discordGuilds: []
  }

  it('throws if guild is not existing', async () => {
    try {
      await buildUser({ ...mockUserPrototype, discordGuildIds: ['0'] })
    } catch (error) {
      expect(error).toBe('getFirestoreDiscordGuildRefByDiscordId Discord Guild not found')
    }
  })
  it('builds correctly with empty guilds', async () => {
    const user = await buildUser(mockUserPrototype)
    expect(user).toStrictEqual(mockUser)
  })
  it('builds correctly with one guild', async () => {
    const guildsRef = [discordGuildReferences['xA40abnyBq6qQHSYmtHj']]
    const user = await buildUser({ ...mockUserPrototype, discordGuildIds: ['1'] })
    expect(omit(['discordGuilds'], user)).toStrictEqual(omit(['discordGuilds'], mockUser))
    expect(user.discordGuilds).toBeDefined()
    user.discordGuilds?.map((guildRef, index) => expect(guildRef.path).toBe(guildsRef[index]!.path))
  })
  it('builds correctly with multiple guilds', async () => {
    const guildsRef = [discordGuildReferences['xA40abnyBq6qQHSYmtHj'], discordGuildReferences['ncUnbpFfVCofV9bD7ctn']]
    const user = await buildUser({ ...mockUserPrototype, discordGuildIds: ['1', '100'] })
    expect(omit(['discordGuilds'], user)).toStrictEqual(omit(['discordGuilds'], mockUser))
    expect(user.discordGuilds).toBeDefined()
    user.discordGuilds?.map((guildRef, index) => expect(guildRef.path).toBe(guildsRef[index]!.path))
  })
  it('throws with multiple guilds and an invalid one', async () => {
    try {
      await buildUser({ ...mockUserPrototype, discordGuildIds: ['1', '100', '0'] })
    } catch (error) {
      expect(error).toBe('getFirestoreDiscordGuildRefByDiscordId Discord Guild not found')
    }
  })
})
