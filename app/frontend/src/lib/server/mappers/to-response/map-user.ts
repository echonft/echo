import type { UserResponse } from '@echo/api'
import type { User } from '@echo/firestore-types'
import { assoc, dissoc, head, lens, over, pick, pipe, prop } from 'ramda'

export function mapUser(user: User) {
  return pipe(
    pick(['id', 'discordAvatar', 'discordBanner', 'discordId', 'discordUsername', 'username', 'wallets']),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    over(lens(prop('wallets'), assoc('wallet')), head),
    dissoc('wallets')
  )(user) as UserResponse
}
