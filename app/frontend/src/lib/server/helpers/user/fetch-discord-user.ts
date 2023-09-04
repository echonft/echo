import { fetcher } from '../../../helpers/fetcher'
import { mapDiscordUserResponseToUser } from '../../mappers/from-discord/map-discord-user-response-to-user'
import { DiscordUserGuildResponse } from '../../types/user/discord-user-guild-response'
import { DiscordUserResponse } from '../../types/user/discord-user-response'

export async function fetchDiscordUser(accessToken: string, tokenType: string) {
  try {
    const user = await fetcher('https://discord.com/api/users/@me')
      .authorization(tokenType, accessToken)
      .revalidate(3600)
      .fetchResponse<DiscordUserResponse>()
    const guilds = await fetcher('https://discord.com/api/users/@me/guilds')
      .authorization(tokenType, accessToken)
      .revalidate(3600)
      .fetchResponse<DiscordUserGuildResponse[]>()

    return mapDiscordUserResponseToUser({
      ...user,
      guilds
    })
  } catch (e) {
    throw Error('Error fetching discord user')
  }
}
