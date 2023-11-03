import { type ApiRequest } from '@echo/api/types/api-request'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { guarded_setNonceForUser } from '@echo/frontend/lib/server/helpers/user/guarded_set-nonce-for-user'
import { NextResponse } from 'next/server'

export async function nonceRequestHandler(req: ApiRequest<never>) {
  const user = await getUserFromRequest(req)
  const nonce = await guarded_setNonceForUser(user.id)
  return NextResponse.json<NonceResponse>({ nonce })
}
