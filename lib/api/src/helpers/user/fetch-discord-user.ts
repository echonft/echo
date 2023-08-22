import { fetchDiscordUser as discordFetchDiscordUser } from '@echo/discord'
import { DiscordGuild, User } from '@echo/firestore'
import { applySpec, map, pipe, prop } from 'ramda'

export const fetchDiscordUser = async (accessToken: string, tokenType: string) => {
  try {
    const discordUserResponse = await discordFetchDiscordUser(accessToken, tokenType, true)
    return applySpec<Omit<User, 'id' | 'nonce' | 'updatedAt' | 'wallets'>>({
      discordAvatar: prop('avatar'),
      discordBanner: prop('banner'),
      discordGuilds: pipe(prop('guilds'), map(applySpec<Omit<DiscordGuild, 'channelId'>>({ discordId: prop('id') }))),
      discordId: prop('id'),
      discordUsername: prop('username')
    })(discordUserResponse)
  } catch (e) {
    throw Error('Error fetching discord user')
  }
}
