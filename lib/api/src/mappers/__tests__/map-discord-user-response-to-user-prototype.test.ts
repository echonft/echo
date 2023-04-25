import { mapDiscordUserResponseToUserPrototype } from '../map-discord-user-response-to-user-prototype'
import { DiscordUserResponse } from '@echo/discord'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapDiscordUserResponseToUserPrototype', () => {
  it('should return the expected user prototype when given a valid response', () => {
    const validResponse = {
      id: '123',
      username: 'testuser',
      discriminator: '0001',
      avatar: 'abcdefg',
      banner: '123456',
      guilds: [
        {
          id: 'guild1',
          name: 'test',
          icon: 'icon',
          owner: false,
          permissions: 0,
          features: []
        },
        {
          id: 'guild2',
          name: 'test',
          icon: 'icon',
          owner: false,
          permissions: 0,
          features: []
        }
      ]
    }
    const expectedUserPrototype = {
      discordId: '123',
      discordUsername: 'testuser#0001',
      discordAvatar: 'abcdefg',
      discordBanner: '123456',
      discordGuildIds: ['guild1', 'guild2']
    }

    const result = mapDiscordUserResponseToUserPrototype(validResponse)
    expect(result).toEqual(expectedUserPrototype)
  })

  it('should return the expected user prototype when given a response with missing guilds', () => {
    const responseWithMissingGuilds = {
      id: '123',
      username: 'testuser',
      discriminator: '0001',
      avatar: 'abcdefg',
      banner: '123456'
    } as unknown as DiscordUserResponse

    const expectedUserPrototype = {
      discordId: '123',
      discordUsername: 'testuser#0001',
      discordAvatar: 'abcdefg',
      discordBanner: '123456',
      discordGuildIds: []
    }

    let result = mapDiscordUserResponseToUserPrototype(responseWithMissingGuilds)
    expect(result).toEqual(expectedUserPrototype)

    const responseWithEmptyGuilds = {
      id: '123',
      username: 'testuser',
      discriminator: '0001',
      avatar: 'abcdefg',
      banner: '123456',
      guilds: []
    }
    result = mapDiscordUserResponseToUserPrototype(responseWithEmptyGuilds)
    expect(result).toEqual(expectedUserPrototype)
  })
  it('should return the expected user prototype when given a response with missing banner', () => {
    const responseWithMissingBanner = {
      id: '123',
      username: 'testuser',
      discriminator: '0001',
      avatar: 'abcdefg',
      guilds: []
    }
    const expectedUserPrototype = {
      discordId: '123',
      discordUsername: 'testuser#0001',
      discordAvatar: 'abcdefg',
      discordGuildIds: []
    }
    const result = mapDiscordUserResponseToUserPrototype(responseWithMissingBanner)
    expect(result).toEqual(expectedUserPrototype)
  })
})
