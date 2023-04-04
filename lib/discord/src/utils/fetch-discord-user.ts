import { DiscordRoutes } from '../routing'
import { DiscordUserResponse } from '../types'
import { fetchDiscordUserGuilds } from './fetch-discord-user-guilds'
import { getUrl } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, assoc, join, pipe } from 'ramda'

// TODO Functional this shit
export async function fetchDiscordUser(
  accessToken: string,
  tokenType: string,
  fetchGuilds = false
): Promise<R.Result<DiscordUserResponse, Error>> {
  return getUrl<DiscordUserResponse>(DiscordRoutes.USER, join(' ', [tokenType, accessToken])).then(
    (discordUserResult) => {
      if (R.isError(discordUserResult)) {
        throw Error('Error fetching discord user data')
      }
      if (fetchGuilds) {
        return pipe(
          fetchDiscordUserGuilds,
          andThen(
            R.map((guilds) => ({
              ...R.getExn(discordUserResult),
              guilds
            }))
          )
        )(accessToken, tokenType)
      }
      return R.map(discordUserResult, assoc('guilds', []))
    }
  )
}
