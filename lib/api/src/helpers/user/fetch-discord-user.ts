import { mapDiscordUserResponseToUser } from '../../mappers/from-discord/map-discord-user-response-to-user'
import { fetchDiscordUser as discordFetchDiscordUser } from '@echo/discord'

export const fetchDiscordUser = async (accessToken: string, tokenType: string) => {
  try {
    const discordUserResponse = await discordFetchDiscordUser(accessToken, tokenType, true)
    return mapDiscordUserResponseToUser(discordUserResponse)
  } catch (e) {
    throw Error('Error fetching discord user')
  }
}
