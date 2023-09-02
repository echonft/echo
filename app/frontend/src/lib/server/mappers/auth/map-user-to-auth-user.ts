import { User, UserDiscordGuild } from '@echo/firestore'
import { AuthUser, Wallet } from '@echo/ui-model'
import { modifyDatePropToNumber, removeUndefinedProps } from '@echo/utils'
import { Dayjs } from 'dayjs'
import { dissoc, pipe } from 'ramda'

interface RequiredProps {
  id: string
  discordAvatar: string | undefined
  discordBanner: string | undefined
  discordGuilds: UserDiscordGuild[]
  discordId: string
  discordUsername: string
  nftsUpdatedAt: Dayjs
  updatedAt: Dayjs
  wallets: Wallet[]
}

export function mapUserToAuthUser(user: Partial<User> & RequiredProps) {
  return pipe(
    removeUndefinedProps,
    dissoc('nonce'),
    modifyDatePropToNumber('nftsUpdatedAt'),
    modifyDatePropToNumber('updatedAt')
  )(user) as AuthUser
}
