import type { ApiRequest } from '@echo/api/types/base/api-request'
import type { GetUserResponse } from '@echo/api/types/responses/get-user-response'
import { assertDiscordUser } from '@server/helpers/discord-user/assert-discord-user'
import { getDiscordUserByUserId } from '@server/helpers/discord-user/get-discord-user-by-user-id'
import { assertUser } from '@server/helpers/user/assert-user'
import { getUserByUsername } from '@server/helpers/user/get-user-by-username'
import { getWalletsByUserId } from '@server/helpers/wallet/get-wallets-by-user-id'
import { mapDiscordUserToResponse } from '@server/mappers/to-response/map-discord-user-to-response'
import { NextResponse } from 'next/server'

export async function getUserRequestHandler(_req: ApiRequest<never>, username: string) {
  const user = await getUserByUsername(username)
  assertUser(user)
  const discordUser = await getDiscordUserByUserId(user.id)
  assertDiscordUser(discordUser)
  const wallets = await getWalletsByUserId(user.id)
  return NextResponse.json<GetUserResponse>({ user: mapDiscordUserToResponse(discordUser, username, wallets) })
}
