import { DiscordUserResponse } from '@echo/discord'
import { DiscordGuild, User } from '@echo/firestore'
import { applySpec, map, pipe, prop } from 'ramda'

export function mapDiscordUserResponseToUser(
  discordUserResponse: DiscordUserResponse
): Omit<User, 'id' | 'nonce' | 'updatedAt' | 'wallets'> {
  return applySpec<Omit<User, 'id' | 'nonce' | 'updatedAt' | 'wallets'>>({
    discordAvatar: prop('avatar'),
    discordBanner: prop('banner'),
    discordGuilds: pipe(prop('guilds'), map(applySpec<Omit<DiscordGuild, 'channelId'>>({ discordId: prop('id') }))),
    discordId: prop('id'),
    discordUsername: prop('username')
  })(discordUserResponse)
}
