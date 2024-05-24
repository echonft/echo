import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { AuthUser } from '@echo/model/types/auth-user'
import type { UserProfile } from '@echo/model/types/user-profile'
import type { Wallet } from '@echo/model/types/wallet'
import { andThen, assoc, map, modify, omit, pick, pipe, prop } from 'ramda'

type User = UserDocumentData | AuthUser

export async function getUserProfile(user: User): Promise<UserProfile> {
  const wallets = await pipe<[AuthUser], string, Promise<WalletDocumentData[]>, Promise<Wallet[]>>(
    prop('username'),
    getWalletsForUser,
    andThen(map(mapWalletDocumentDataToWallet))
  )(user)
  return pipe<[User], Pick<User, 'username' | 'discord'>, Omit<UserProfile, 'wallets'>, UserProfile>(
    pick(['username', 'discord']),
    modify<'discord', User['discord'], UserProfile['discord']>('discord', omit(['id'])),
    assoc('wallets', wallets)
  )(user)
}
