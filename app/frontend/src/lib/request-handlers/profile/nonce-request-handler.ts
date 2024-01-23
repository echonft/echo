import { type ApiRequest } from '@echo/api/types/api-request'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { setNonceForUser } from '@echo/firestore/crud/nonce/set-nonce-for-user'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { guarded_assertUserExists } from '@echo/frontend/lib/helpers/user/assert/guarded_assert-user-exists'
import type { AuthUser } from '@echo/model/types/auth-user'
import { NextResponse } from 'next/server'
import { generateNonce } from 'siwe'

export async function nonceRequestHandler(user: AuthUser, _req: ApiRequest<never>) {
  const foundUser = await guardAsyncFn(findUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  guarded_assertUserExists(foundUser, user.username)
  const { nonce } = await guardAsyncFn(setNonceForUser, ErrorStatus.SERVER_ERROR)(foundUser.id, generateNonce())
  return NextResponse.json<NonceResponse>({ nonce })
}
