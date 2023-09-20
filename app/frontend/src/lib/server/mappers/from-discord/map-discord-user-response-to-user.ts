import { modifyPropName } from '@echo/utils/fp/modify-prop-name'
import type { DiscordUser } from '@server/types/user/discord-user'
import type { DiscordUserResponse } from '@server/types/user/discord-user-response'
import { pick, pipe } from 'ramda'

export function mapDiscordUserResponseToUser(discordUserResponse: DiscordUserResponse): DiscordUser {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pick(['id', 'avatar', 'banner', 'id', 'username']),
    modifyPropName<'avatar', DiscordUserResponse>('avatar', 'discordAvatar'),
    modifyPropName('banner', 'discordBanner'),
    modifyPropName('id', 'discordId'),
    modifyPropName('username', 'discordUsername')
  )(discordUserResponse)
}
