import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { UserProfile } from '@echo/model/types/user-profile'
import { mapFirestoreWalletToWallet } from '@server/mappers/map-firestore-wallet-to-wallet'
import { map, modify, omit, pick, pipe } from 'ramda'

export function mapFirestoreUserToUserProfile(user: UserDocumentData, wallets: WalletDocumentData[]) {
  return pipe(
    pick(['username', 'discord', 'wallets']),
    modify('discord', omit(['id'])),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    modify('wallets', map(mapFirestoreWalletToWallet))
  )({ ...user, wallets }) as UserProfile
}
