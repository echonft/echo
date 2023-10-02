import type { FirestoreUser } from '@echo/firestore/types/model/user/firestore-user'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import { WalletData } from '@echo/firestore/types/model/wallet/wallet-data'
import { assoc, modify, pick, pipe } from 'ramda'

export function getUserDetails(user: FirestoreUser, wallet: WalletData): FirestoreUserDetails {
  return pipe(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pick(['username', 'discord']),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('discord', pick(['avatarUrl', 'username'])),
    assoc('wallet', wallet)
  )(user) as FirestoreUserDetails
}
