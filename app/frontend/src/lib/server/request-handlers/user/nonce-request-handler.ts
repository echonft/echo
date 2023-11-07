import { type ApiRequest } from '@echo/api/types/api-request'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { setNonceForUser } from '@echo/firestore/crud/nonce/set-nonce-for-user'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertAuthUser } from '@echo/frontend/lib/server/helpers/request/assert/guarded_assert-auth-user'
import { getUserFromRequest } from '@echo/frontend/lib/server/helpers/request/get-user-from-request'
import { NextResponse } from 'next/server'
import { generateNonce } from 'siwe'

export async function nonceRequestHandler(req: ApiRequest<never>) {
  const user = await getUserFromRequest(req)
  guarded_assertAuthUser(user)
  const { nonce } = await guardAsyncFn(setNonceForUser, ErrorStatus.SERVER_ERROR)(user.id, generateNonce())
  return NextResponse.json<NonceResponse>({ nonce })
}
