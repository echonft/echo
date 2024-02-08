import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/map-wallet-document-data-to-wallet'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { User } from '@echo/model/types/user'
import { assoc, modify, pick, pipe } from 'ramda'

export function getUserFromFirestoreData(user: UserDocumentData, wallet: WalletDocumentData): User {
  return pipe<
    [UserDocumentData],
    Pick<UserDocumentData, 'username' | 'discord'>,
    Pick<User, 'username' | 'discord'>,
    User
  >(
    pick(['username', 'discord']),
    modify<'discord', UserDocumentData['discord'], User['discord']>('discord', pick(['avatarUrl', 'username'])),
    assoc('wallet', mapWalletDocumentDataToWallet(wallet))
  )(user)
}
