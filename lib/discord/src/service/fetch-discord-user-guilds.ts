import { DiscordRoutes } from '../routing/discord-routes'
import { DiscordUserGuildResponse } from '../types/model/discord-user-guild-response'
import { getBearerToken } from '../utils/get-bearer-token'
import { getData } from '@echo/utils'

export function fetchDiscordUserGuilds(accessToken: string, tokenType: string) {
  return getData<DiscordUserGuildResponse[]>(
    new URL(DiscordRoutes.USER_GUILDS),
    undefined,
    getBearerToken(tokenType, accessToken)
  )
}
