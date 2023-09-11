import { modifyPropName } from '@echo/utils/src/fp/modify-prop-name'
import type { DiscordUser } from '@server/types/user/discord-user'
import type { DiscordUserResponse } from '@server/types/user/discord-user-response'
import { map, modify, pick, pipe } from 'ramda'

export function mapDiscordUserResponseToUser(discordUserResponse: DiscordUserResponse): DiscordUser {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pick(['id', 'avatar', 'banner', 'id', 'username', 'guilds']),
    modifyPropName<'avatar', DiscordUserResponse>('avatar', 'discordAvatar'),
    modifyPropName('banner', 'discordBanner'),
    modifyPropName('id', 'discordId'),
    modifyPropName('username', 'discordUsername'),
    modifyPropName('guilds', 'discordGuilds'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    modify('discordGuilds', map(pipe(pick(['id']), modifyPropName('id', 'discordId'))))
  )(discordUserResponse)
}
