import type { UpdateUserRequest } from '@echo/api/types/requests/update-user-request'
import { updateUserRequestSchema } from '@echo/api/validators/update-user-request-schema'
import { userDiscordProfileFromDiscordProvider } from '@echo/auth/helpers/providers/discord/user-discord-profile-from-discord-provider'
import { BadRequestError } from '@echo/backend/errors/bad-request-error'
import { toNextReponse } from '@echo/backend/request-handlers/to-next-reponse'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import { discordProfileResponseSchema } from '@echo/backend/validators/discord-profile-response-schema'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { addOrUpdateUser } from '@echo/firestore/crud/user/add-or-update-user'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { andThen, objOf, pipe } from 'ramda'

export async function updateUserRequestHandler(args: RequestHandlerArgs<UpdateUserRequest>) {
  const token = await parseRequest(updateUserRequestSchema)(args.req)
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  })
  if (response.ok) {
    return pipe(
      parseResponse(discordProfileResponseSchema),
      andThen(pipe(userDiscordProfileFromDiscordProvider, addOrUpdateUser, objOf('user'), toNextReponse))
    )(response)
  }
  return Promise.reject(new BadRequestError({ message: 'request to Discord failed' }))
}
