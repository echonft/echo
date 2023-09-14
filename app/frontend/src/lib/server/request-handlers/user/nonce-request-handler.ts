import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { NonceResponse } from '@echo/api/types/responses/nonce-response'
import { getUserFromSession } from '@server/helpers/auth/get-user-from-session'
import { setUserNonce } from '@server/helpers/user/set-user-nonce'
import { NextResponse } from 'next/server'
import type { AuthOptions } from 'next-auth'

export async function nonceRequestHandler(_req: ApiRequest<never>, authOptions: AuthOptions) {
  const user = await getUserFromSession(authOptions)
  const nonce = await setUserNonce(user)
  return NextResponse.json<NonceResponse>({ nonce })
}
