import { verifyWhitelistStatus } from '@echo/backend/actions/verify-whitelist-status'
import type { ErrorResponse } from '@echo/backend/types/error-response'
import type { RequestHandlerArgs } from '@echo/backend/types/request-handler'
import type { VerifyRequest } from '@echo/backend/types/verify-request'
import { parseRequest } from '@echo/backend/validators/parse-request'
import { verifyRequestSchema } from '@echo/backend/validators/verify-request-schema'
import { NextResponse } from 'next/server'
import { pipe } from 'ramda'

interface VerifyResponse {
  isWhitelisted: boolean
}

export async function verifyRequestHandler({ req }: RequestHandlerArgs<VerifyRequest>): Promise<NextResponse> {
  try {
    const { discordId } = await pipe(parseRequest(verifyRequestSchema))(req)
    const isWhitelisted = await verifyWhitelistStatus(discordId)
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
