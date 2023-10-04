import type { UserResponse } from '@echo/api/types/responses/model/user-response'
import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import type { FirestoreWallet } from '@echo/firestore/types/model/wallet/firestore-wallet'
import { mapWalletToResponse } from '@server/mappers/to-response/map-wallet-to-response'
import { map, modify, omit, pick, pipe } from 'ramda'

export function mapUserToResponse(user: FirestoreUser, wallets: FirestoreWallet[]) {
  return pipe(
    pick(['username', 'discord', 'wallets']),
    modify('discord', omit(['id'])),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('wallets', map(mapWalletToResponse))
  )({ ...user, wallets }) as UserResponse
}
