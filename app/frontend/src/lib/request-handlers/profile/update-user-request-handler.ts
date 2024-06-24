import { mapDiscordProfile } from '@echo/auth/map-discord-profile'
import { updateUser } from '@echo/firestore/crud/user/update-user'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { createError } from '@echo/frontend/lib/helpers/error/create-error'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import type { RequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/request-handler'
import { discordAuthTokenSchema } from '@echo/frontend/lib/validators/discord-auth-token-schema'
import { discordProfileSchema } from '@echo/frontend/lib/validators/discord-profile-schema'
import { parseRequest } from '@echo/frontend/lib/validators/parse-request'
import type { DiscordAuthToken } from '@echo/model/types/discord-auth-token'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { NextResponse } from 'next/server'
import { pipe } from 'ramda'

export async function updateUserRequestHandler(args: RequestHandlerArgs<DiscordAuthToken>) {
  const logger = args.logger?.child({ fn: updateUserRequestHandler.name })
  const token = await guardAsyncFn({
    fn: parseRequest(discordAuthTokenSchema),
    status: ErrorStatus.BAD_REQUEST,
    severity: 'error',
    message: 'error parsing discord auth token',
    logger
  })(args.req)
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  })
  if (response.ok) {
    const profile = await guardAsyncFn({
      fn: parseResponse(discordProfileSchema),
      status: ErrorStatus.BAD_REQUEST,
      severity: 'error',
      message: 'error parsing discord response',
      logger
    })(response)
    const user = await pipe(mapDiscordProfile, updateUser)(profile)
    logger?.info({ user }, 'updated user')
    return NextResponse.json({ user })
  }
  logger?.error({ token }, 'request to Discord failed')
  throw createError(ErrorStatus.BAD_REQUEST, 'request to Discord failed')
}
