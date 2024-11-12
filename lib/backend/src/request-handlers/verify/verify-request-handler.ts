import { verifyWhitelistStatus } from '@echo/backend/actions/verify-whitelist-status'
import type { ErrorResponse } from '@echo/backend/types/error-response'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import type { VerifyRequest } from '@echo/backend/types/verify-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { verifyRequestSchema } from '@echo/backend/validators/verify-request-schema'
import { getUserByDiscordId } from '@echo/firestore/crud/user/get-user-by-discord-id'
import { NextResponse } from 'next/server'
import { isNil, pipe } from 'ramda'

interface VerifyResponse {
  isWhitelisted: boolean
}

export async function verifyRequestHandler({ req }: RequestHandlerArgs<VerifyRequest>): Promise<NextResponse> {
  try {
    const { discordId } = await pipe(parseRequest(verifyRequestSchema))(req)

    const user = await getUserByDiscordId(discordId)
    if (isNil(user) || isNil(user.wallet)) {
      return NextResponse.json<VerifyResponse>({ isWhitelisted: false })
    }

    const isWhitelisted = await verifyWhitelistStatus(discordId, user.wallet)
    return NextResponse.json<VerifyResponse>({ isWhitelisted })
  } catch (_err) {
    return NextResponse.json<ErrorResponse>(
      {
        error: 'internal server error'
      },
      { status: 500 }
    )
  }
}
