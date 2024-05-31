import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { UserProfile } from '@echo/model/types/user-profile'
import type { Wallet } from '@echo/model/types/wallet'
import type { User } from 'next-auth'
import { andThen, assoc, map, modify, omit, pick, pipe, prop } from 'ramda'

export async function getUserProfile(user: User): Promise<UserProfile> {
  const wallets = await pipe<[User], string, Promise<WalletDocumentData[]>, Promise<Wallet[]>>(
    prop('username'),
    getWalletsForUser,
    andThen(map(mapWalletDocumentDataToWallet))
  )(user)
  return pipe<[User], Pick<User, 'username' | 'discord'>, Omit<UserProfile, 'wallets'>, UserProfile>(
    pick(['username', 'discord']),
    modify<'discord', User['discord'], UserProfile['discord']>('discord', omit(['id', 'discriminator'])),
    assoc('wallets', wallets)
  )(user)
}
