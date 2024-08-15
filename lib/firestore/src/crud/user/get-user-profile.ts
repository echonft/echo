import { getUserCounts } from '@echo/firestore/crud/user-counts/get-user-counts'
import { getWalletsForUser } from '@echo/firestore/crud/wallet/get-wallets-for-user'
import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { UserProfile } from '@echo/model/types/user-profile'
import type { Wallet } from '@echo/model/types/wallet'
import { andThen, assoc, map, mergeLeft, modify, omit, pick, pipe, prop } from 'ramda'

export async function getUserProfile(user: UserDocumentData): Promise<UserProfile> {
  const wallets = await pipe<[UserDocumentData], string, Promise<WalletDocumentData[]>, Promise<Wallet[]>>(
    prop('username'),
    getWalletsForUser,
    andThen(map(mapWalletDocumentDataToWallet))
  )(user)
  const counts = await pipe(prop('username'), getUserCounts)(user)
  return pipe<
    [UserDocumentData],
    Pick<UserDocumentData, 'username' | 'discord'>,
    Omit<UserProfile, 'wallets' | 'listingsCount' | 'nftsCount' | 'offersCount' | 'swapsCount'>,
    Omit<UserProfile, 'listingsCount' | 'nftsCount' | 'offersCount' | 'swapsCount'>,
    UserProfile
  >(
    pick(['username', 'discord']),
    modify<'discord', UserDocumentData['discord'], UserProfile['discord']>('discord', omit(['id', 'discriminator'])),
    assoc('wallets', wallets),
    mergeLeft(counts)
  )(user)
}
