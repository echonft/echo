import type { ApiRequest } from '@echo/api/types/api-request'
import { type UserResponse } from '@echo/api/types/responses/user-response'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { ErrorStatus } from '@echo/frontend/lib/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/helpers/error/guard'
import { guarded_assertUserExists } from '@echo/frontend/lib/helpers/user/assert/guarded_assert-user-exists'
import { mapFirestoreUserToUserProfile } from '@echo/frontend/lib/mappers/map-firestore-user-to-user-profile'
import { NextResponse } from 'next/server'

export async function getUserRequestHandler(_request: ApiRequest<never>, params: { username: string }) {
  const { username } = params
  const user = await guardAsyncFn(findUserByUsername, ErrorStatus.SERVER_ERROR)(username)
  guarded_assertUserExists(user, username)
  const wallets = await guardAsyncFn(getWalletsForUser, ErrorStatus.SERVER_ERROR)(username)
  return NextResponse.json<UserResponse>({ user: mapFirestoreUserToUserProfile(user, wallets) })
}
