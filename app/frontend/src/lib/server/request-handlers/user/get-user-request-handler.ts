import type { ApiRequest } from '@echo/api/types/api-request'
import type { GetUserResponse } from '@echo/api/types/responses/get-user-response'
import { assertUser } from '@server/helpers/user/assert-user'
import { getUserByUsername } from '@server/helpers/user/get-user-by-username'
import { getWalletsByUserId } from '@server/helpers/wallet/get-wallets-by-user-id'
import { mapUserToResponse } from '@server/mappers/to-response/map-user-to-response'
import { NextResponse } from 'next/server'

export async function getUserRequestHandler(_req: ApiRequest<never>, username: string) {
  const user = await getUserByUsername(username)
  assertUser(user)
  const wallets = await getWalletsByUserId(user.id)
  return NextResponse.json<GetUserResponse>({ user: mapUserToResponse(user, wallets) })
}
