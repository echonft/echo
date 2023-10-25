import { type ApiRequest } from '@echo/api/types/api-request'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { setUserNonce } from '@echo/frontend/lib/server/helpers/user/set-user-nonce'
import { NextResponse } from 'next/server'

export async function nonceRequestHandler(req: ApiRequest<never>) {
  const user = await getUserFromRequest(req)
  const nonce = await setUserNonce(user.id)
  return NextResponse.json<NonceResponse>({ nonce })
}
