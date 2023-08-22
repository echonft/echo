import { DiscordRoutes } from '../routing/discord-routes'
import { DiscordUserGuildResponse } from '../types/model/discord-user-guild-response'
import { getUrl } from '@echo/utils'
import { join } from 'ramda'

export function fetchDiscordUserGuilds(accessToken: string, tokenType: string) {
  return getUrl<DiscordUserGuildResponse[]>(DiscordRoutes.USER_GUILDS, join(' ', [tokenType, accessToken]))
}
