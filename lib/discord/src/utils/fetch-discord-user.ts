import { DiscordRoutes } from '../routing'
import { DiscordUserResponse } from '../types'
import { DiscordUserGuildResponse } from '../types/model/discord-user-guild-response'
import { getUrl } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, assoc, join, pipe } from 'ramda'

// TODO Functional this shit
export async function fetchDiscordUser(
  accessToken: string,
  tokenType: string,
  fetchGuilds = false
): Promise<R.Result<DiscordUserResponse, Error>> {
  const auth = join(' ', [tokenType, accessToken])
  return getUrl<DiscordUserResponse>(DiscordRoutes.USER, auth).then((discordUserResult) => {
    if (R.isError(discordUserResult)) {
      throw Error('Error fetching discord user data')
    }
    if (fetchGuilds) {
      return pipe(
        getUrl<DiscordUserGuildResponse[]>,
        andThen(
          R.map((guilds) => ({
            ...R.getExn(discordUserResult),
            guilds
          }))
        )
      )(DiscordRoutes.USER_GUILDS, auth)
    }
    return R.map(discordUserResult, assoc('guilds', []))
  })
}
