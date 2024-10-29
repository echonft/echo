import { discordProfileResponseSchema } from '@echo/auth/validators/discord-profile-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { andThen, pipe } from 'ramda'

export function fetchDiscordProfile(token: string) {
  return pipe(fetch, andThen(parseResponse(discordProfileResponseSchema)))('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}
