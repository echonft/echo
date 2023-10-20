import { type ApiRequest } from '@echo/api/types/api-request'
import { type UserResponse } from '@echo/api/types/responses/user-response'
import { assertUser } from '@server/helpers/user/assert-user'
import { getUserByUsername } from '@server/helpers/user/get-user-by-username'
import { getWalletsByUserId } from '@server/helpers/wallet/get-wallets-by-user-id'
import { mapFirestoreUserToUserProfile } from '@server/mappers/map-firestore-user-to-user-profile'
import { NextResponse } from 'next/server'

export async function getUserRequestHandler(_req: ApiRequest<never>, username: string) {
  const user = await getUserByUsername(username)
  assertUser(user)
  const wallets = await getWalletsByUserId(user.id)
  return NextResponse.json<UserResponse>({ user: mapFirestoreUserToUserProfile(user, wallets) })
}
