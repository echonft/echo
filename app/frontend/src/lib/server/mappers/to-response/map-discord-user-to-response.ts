import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import type { FirestoreDiscordUser } from '@echo/firestore/types/model/discord-user/firestore-discord-user'
import { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { mapWalletToResponse } from '@server/mappers/to-response/map-wallet-to-response'
import { dissoc, map, modify, pipe, unless } from 'ramda'

export function mapDiscordUserToResponse(user: FirestoreDiscordUser, username: string, wallets: FirestoreWallet[]) {
  return pipe(
    dissoc('id'),
    dissoc('userId'),
    dissoc('updatedAt'),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    unless(propIsNil('wallets'), modify('wallets', map(mapWalletToResponse)))
  )({ ...user, username, wallets }) as UserResponse
}
