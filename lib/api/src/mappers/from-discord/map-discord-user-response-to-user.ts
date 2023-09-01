import { DiscordUser } from '../../types/user/discord-user'
import { DiscordUserResponse } from '../../types/user/discord-user-response'
import { UserDiscordGuild } from '@echo/firestore'
import { applySpec, map, pipe, prop } from 'ramda'

export function mapDiscordUserResponseToUser(discordUserResponse: DiscordUserResponse): DiscordUser {
  return applySpec<DiscordUser>({
    discordAvatar: prop('avatar'),
    discordBanner: prop('banner'),
    discordGuilds: pipe(prop('guilds'), map(applySpec<UserDiscordGuild>({ discordId: prop('id') }))),
    discordId: prop('id'),
    discordUsername: prop('username')
  })(discordUserResponse)
}
