import { type ApiRequest } from '@echo/api/types/api-request'
import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { setNonceForUser } from '@echo/firestore/crud/nonce/set-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertUserExists } from '@echo/frontend/lib/helpers/user/assert/assert-user-exists'
import { NextResponse } from 'next/server'
import type { User } from 'next-auth'
import { generateNonce } from 'siwe'

export async function nonceRequestHandler(user: User, _req: ApiRequest<never>) {
  const foundUser = await guardAsyncFn(getUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  assertUserExists(foundUser, user.username)
  const { nonce } = await guardAsyncFn(setNonceForUser, ErrorStatus.SERVER_ERROR)(foundUser.username, generateNonce())
  return NextResponse.json<NonceResponse>({ nonce })
}
