import { DiscordRoutes } from '../routing/discord-routes'
import { DiscordUserResponse } from '../types/model/discord-user-response'
import { fetchDiscordUserGuilds } from './fetch-discord-user-guilds'
import { getUrl } from '@echo/utils'
import { andThen, join, pipe } from 'ramda'

// TODO Functional this shit
export function fetchDiscordUser(
  accessToken: string,
  tokenType: string,
  fetchGuilds = false
): Promise<DiscordUserResponse> {
  return getUrl<DiscordUserResponse>(DiscordRoutes.USER, join(' ', [tokenType, accessToken]))
    .then((discordUserResponse) => {
      if (fetchGuilds) {
        return pipe(
          fetchDiscordUserGuilds,
          andThen((guilds) => ({
            ...discordUserResponse,
            guilds
          }))
        )(accessToken, tokenType)
      }
      return { ...discordUserResponse, guilds: [] }
    })
    .catch(() => Promise.reject('Error fetching discord user data'))
}
