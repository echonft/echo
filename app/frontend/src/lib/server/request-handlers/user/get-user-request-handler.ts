import { type ApiRequest } from '@echo/api/types/api-request'
import { type UserResponse } from '@echo/api/types/responses/user-response'
import { assertUserExists } from '@echo/frontend/lib/server/helpers/user/assert/assert-user-exists'
import { guarded_findUserByUsername } from '@echo/frontend/lib/server/helpers/user/guarded_find-user-by-username'
import { guarded_getWalletsForUser } from '@echo/frontend/lib/server/helpers/wallet/guarded_get-wallets-for-user'
import { mapFirestoreUserToUserProfile } from '@echo/frontend/lib/server/mappers/map-firestore-user-to-user-profile'
import { NextResponse } from 'next/server'

export async function getUserRequestHandler(_req: ApiRequest<never>, username: string) {
  const user = await guarded_findUserByUsername(username)
  assertUserExists(user, username)
  const wallets = await guarded_getWalletsForUser(user.id)
  return NextResponse.json<UserResponse>({ user: mapFirestoreUserToUserProfile(user, wallets) })
}
