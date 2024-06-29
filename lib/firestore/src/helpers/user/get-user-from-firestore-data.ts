import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { User } from '@echo/model/types/user'
import type { Wallet } from '@echo/model/types/wallet'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, omit, path, pipe, prop } from 'ramda'

interface GetUserFromFirestoreDataArgs {
  user: UserDocumentData
  wallet: PartialWallet
}

export function getUserFromFirestoreData(args: GetUserFromFirestoreDataArgs): User {
  return applySpec<User>({
    username: path(['user', 'username']),
    discord: pipe(nonNullableReturn(path(['user', 'discord'])), omit(['id', 'discriminator'])),
    wallet: pipe<[GetUserFromFirestoreDataArgs], PartialWallet, Wallet>(prop('wallet'), mapWalletDocumentDataToWallet)
  })(args)
}
