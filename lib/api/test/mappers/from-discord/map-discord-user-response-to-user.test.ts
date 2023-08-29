import { mapDiscordUserResponseToUser } from '../../../src/mappers/from-discord/map-discord-user-response-to-user'
import { describe, expect, it } from '@jest/globals'

describe('mappers - from-discord - mapDiscordUserResponseToUser', () => {
  it('correctly maps the user', () => {
    expect(
      mapDiscordUserResponseToUser({
        id: 'id',
        username: 'username',
        discriminator: 'discriminator',
        avatar: 'avatar',
        banner: 'banner',
        guilds: [
          {
            id: 'guildId',
            name: 'guildName',
            icon: 'guildIcon',
            owner: false,
            permissions: 5,
            features: ['feature1', 'feature2']
          }
        ]
      })
    ).toStrictEqual({
      discordAvatar: 'avatar',
      discordBanner: 'banner',
      discordGuilds: [{ discordId: 'guildId' }],
      discordId: 'id',
      discordUsername: 'username'
    })
  })
})
