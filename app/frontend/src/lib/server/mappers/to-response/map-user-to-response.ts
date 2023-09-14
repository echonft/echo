import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import type { FirestoreUser } from '@echo/firestore/types/model/firestore-user'
import { assoc, dissoc, head, lens, over, pick, pipe, prop } from 'ramda'

export function mapUserToResponse(user: FirestoreUser) {
  return pipe(
    pick(['id', 'discordAvatar', 'discordBanner', 'discordId', 'discordUsername', 'username', 'wallets']),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    over(lens(prop('wallets'), assoc('wallet')), head),
    dissoc('wallets')
  )(user) as UserResponse
}
