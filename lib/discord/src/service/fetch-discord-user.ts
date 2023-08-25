import { DiscordRoutes } from '../routing/discord-routes'
import { DiscordUserResponse } from '../types/model/discord-user-response'
import { getBearerToken } from '../utils/get-bearer-token'
import { fetchDiscordUserGuilds } from './fetch-discord-user-guilds'
import { getData } from '@echo/utils'

export async function fetchDiscordUser(
  accessToken: string,
  tokenType: string,
  fetchGuilds = false
): Promise<DiscordUserResponse> {
  let discordUserResponse: DiscordUserResponse
  try {
    discordUserResponse = await getData<DiscordUserResponse>(
      new URL(DiscordRoutes.USER),
      undefined,
      getBearerToken(tokenType, accessToken)
    )
  } catch (e) {
    throw Error('Error fetching discord user data')
  }
  if (fetchGuilds) {
    try {
      const guilds = await fetchDiscordUserGuilds(tokenType, accessToken)
      return {
        ...discordUserResponse,
        guilds
      }
    } catch (e) {
      throw Error(`Error fetching discord user ${discordUserResponse.id} guilds`)
    }
  }
  return { ...discordUserResponse, guilds: [] }
}
