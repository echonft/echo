import { fetcher } from '@helpers/fetcher'
import { mapDiscordUserResponseToUser } from '@server/mappers/from-discord/map-discord-user-response-to-user'
import type { DiscordUserResponse } from '@server/types/user/discord-user-response'

export async function fetchDiscordUser(accessToken: string, tokenType: string) {
  const user = await fetcher('https://discord.com/api/users/@me')
    .authorization(tokenType, accessToken)
    .revalidate(3600)
    .fetchResponse<DiscordUserResponse>()

  return mapDiscordUserResponseToUser(user)
}
