import { type UserResponse } from '@echo/api/types/responses/user-response'
import { findUserByUsername } from '@echo/firestore/crud/user/find-user-by-username'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { ErrorStatus } from '@echo/frontend/lib/server/constants/error-status'
import { guardAsyncFn } from '@echo/frontend/lib/server/helpers/error/guard'
import { guarded_assertUserExists } from '@echo/frontend/lib/server/helpers/user/assert/guarded_assert-user-exists'
import { mapFirestoreUserToUserProfile } from '@echo/frontend/lib/server/mappers/map-firestore-user-to-user-profile'
import { NextResponse } from 'next/server'

export async function getUserRequestHandler(username: string) {
  const user = await guardAsyncFn(findUserByUsername, ErrorStatus.SERVER_ERROR)(username)
  guarded_assertUserExists(user, username)
  const wallets = await guardAsyncFn(getWalletsForUser, ErrorStatus.SERVER_ERROR)(user.id)
  return NextResponse.json<UserResponse>({ user: mapFirestoreUserToUserProfile(user, wallets) })
}
