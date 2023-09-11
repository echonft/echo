import type { User, UserDiscordGuild } from '@echo/firestore-types'
import type { AuthUser, Wallet } from '@echo/ui-model'
import { modifyDatePropToNumber } from '@echo/utils'
import type { Dayjs } from 'dayjs'
import { pick, pipe } from 'ramda'

interface RequiredProps {
  id: string
  discordGuilds: UserDiscordGuild[]
  discordId: string
  discordUsername: string
  nftsUpdatedAt: Dayjs
  username: string
  updatedAt: Dayjs
  wallets: Wallet[]
}

export function mapUserToAuthUser(user: Partial<User> & RequiredProps) {
  return pipe(
    pick([
      'id',
      'discordAvatar',
      'discordBanner',
      'discordGuilds',
      'discordId',
      'discordUsername',
      'nftsUpdatedAt',
      'updatedAt',
      'username',
      'wallets'
    ]),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modifyDatePropToNumber('nftsUpdatedAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modifyDatePropToNumber('updatedAt')
  )(user) as AuthUser
}
