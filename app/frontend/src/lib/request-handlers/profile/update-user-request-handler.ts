import type { ApiRequest } from '@echo/api/types/api-request'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import { mapDiscordProfile } from '@echo/frontend/lib/auth/map-discord-profile'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { createError } from '@echo/frontend/lib/helpers/error/create-error'
import { guardAsyncFn, guardFn } from '@echo/frontend/lib/helpers/error/guard'
import type { RequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { discordAuthTokenSchema } from '@echo/frontend/lib/validators/discord-auth-token-schema'
import { discordProfileSchema } from '@echo/frontend/lib/validators/discord-profile-schema'
import type { DiscordAuthToken } from '@echo/model/types/discord-auth-token'
import { NextResponse } from 'next/server'
import { andThen, invoker, pipe } from 'ramda'

export async function updateUserRequestHandler({ req }: RequestHandlerArgs<DiscordAuthToken>) {
  const requestBody = await guardAsyncFn(
    (req: ApiRequest<DiscordAuthToken>) => req.json(),
    ErrorStatus.BAD_REQUEST
  )(req)
  const token = guardFn(
    (requestBody) => discordAuthTokenSchema.parse(requestBody),
    ErrorStatus.BAD_REQUEST,
    'error',
    'error parsing discord auth token'
  )(requestBody)
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  })
  if (response.ok) {
    const profile = await guardAsyncFn(
      pipe(
        invoker(0, 'json'),
        andThen((requestBody) => discordProfileSchema.parse(requestBody))
      ),
      ErrorStatus.BAD_REQUEST,
      'error',
      'error parsing discord response'
    )(response)
    const user = await pipe(mapDiscordProfile, updateUser)(profile)
    return NextResponse.json({ user })
  }
  throw createError(ErrorStatus.BAD_REQUEST, 'request to Discord failed')
}
