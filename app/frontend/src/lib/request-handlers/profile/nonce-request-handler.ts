import { type NonceResponse } from '@echo/api/types/responses/nonce-response'
import { setNonceForUser } from '@echo/firestore/crud/nonce/set-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { assertUserExists } from '@echo/frontend/lib/helpers/user/assert/assert-user-exists'
import type { AuthRequestHandlerArgs } from '@echo/frontend/lib/types/request-handlers/auth-request-handler'
import { NextResponse } from 'next/server'
import { generateNonce } from 'siwe'

export async function nonceRequestHandler({ user }: AuthRequestHandlerArgs) {
  const foundUser = await guardAsyncFn(getUserByUsername, ErrorStatus.SERVER_ERROR)(user.username)
  assertUserExists(foundUser, user.username)
  const { nonce } = await guardAsyncFn(setNonceForUser, ErrorStatus.SERVER_ERROR)(foundUser.username, generateNonce())
  return NextResponse.json<NonceResponse>({ nonce })
}
