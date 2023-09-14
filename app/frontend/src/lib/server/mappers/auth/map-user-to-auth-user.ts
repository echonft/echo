import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import type { FirestoreUserDiscordGuild } from '@echo/firestore/types/model/firestore-user-discord-guild'
import type { FirestoreWallet } from '@echo/firestore/types/model/firestore-wallet'
import type { AuthUser } from '@echo/ui/types/model/auth-user'
import { modifyDatePropToNumber } from '@echo/utils/fp/modify-date-prop-to-number'
import type { Dayjs } from 'dayjs'
import { pick, pipe } from 'ramda'

interface RequiredProps {
  id: string
  discordGuilds: FirestoreUserDiscordGuild[]
  discordId: string
  discordUsername: string
  nftsUpdatedAt: Dayjs
  username: string
  updatedAt: Dayjs
  wallets: FirestoreWallet[]
}

export function mapUserToAuthUser(user: Partial<FirestoreUser> & RequiredProps) {
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
