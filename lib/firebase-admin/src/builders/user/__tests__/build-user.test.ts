import { FirestoreUserPrototype } from '../../../types/prototypes/user/firestore-user-prototype'
import { discordGuildReferences } from '../../../utils/test/mocks/discord-guild/discord-guild-reference'
import { buildUser } from '../build-user'
import { FirestoreUser } from '@echo/firestore'
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

  it('returns empty discordGuilds if guild is not existing', async () => {
    const user = await buildUser({ ...mockUserPrototype, discordGuildIds: ['0'] })
    expect(user).toStrictEqual(mockUser)
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
  it('builds correctly with multiple guilds and an invalid one', async () => {
    const guildsRef = [discordGuildReferences['xA40abnyBq6qQHSYmtHj'], discordGuildReferences['ncUnbpFfVCofV9bD7ctn']]
    const user = await buildUser({ ...mockUserPrototype, discordGuildIds: ['1', '100', '0'] })
    expect(omit(['discordGuilds'], user)).toStrictEqual(omit(['discordGuilds'], mockUser))
    expect(user.discordGuilds).toBeDefined()
    user.discordGuilds?.map((guildRef, index) => expect(guildRef.path).toBe(guildsRef[index]!.path))
  })
})
