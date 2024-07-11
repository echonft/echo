import { mapDiscordProfile } from '@echo/auth/map-discord-profile'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import { BadRequestError } from '@echo/frontend/lib/helpers/error/bad-request-error'
import { toNextReponse } from '@echo/frontend/lib/request-handlers/to-next-reponse'
import type { RequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { discordAuthTokenSchema } from '@echo/frontend/lib/validators/discord-auth-token-schema'
import { discordProfileSchema } from '@echo/frontend/lib/validators/discord-profile-schema'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { andThen, objOf, pipe } from 'ramda'

interface DiscordAuthToken {
  readonly tokenType: string
  readonly accessToken: string
  readonly expiresIn: number
  readonly refreshToken: string
  readonly scope: string
  readonly expiresAt: number
}

export async function updateUserRequestHandler(args: RequestHandlerArgs<DiscordAuthToken>) {
  const token = await parseRequest(discordAuthTokenSchema)(args.req)
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  })
  if (response.ok) {
    return pipe(
      parseResponse(discordProfileSchema),
      andThen(pipe(mapDiscordProfile, updateUser, objOf('user'), toNextReponse))
    )(response)
  }
  return Promise.reject(new BadRequestError({ message: 'request to Discord failed' }))
}
