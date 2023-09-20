import { mapDiscordUserResponseToUser } from '@server/mappers/from-discord/map-discord-user-response-to-user'

describe('mappers - from-discord - mapDiscordUserResponseToUser', () => {
  it('correctly maps the user', () => {
    expect(
      mapDiscordUserResponseToUser({
        id: 'id',
        username: 'username',
        discriminator: 'discriminator',
        avatar: 'avatar',
        banner: 'banner'
      })
    ).toStrictEqual({
      discordAvatar: 'avatar',
      discordBanner: 'banner',
      discordId: 'id',
      discordUsername: 'username'
    })
  })
})
