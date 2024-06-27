import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { User } from '@echo/model/types/user'
import type { Wallet } from '@echo/model/types/wallet'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import { applySpec, omit, path, pipe, prop } from 'ramda'

interface GetUserFromFirestoreDataArgs<T extends Wallet> {
  user: UserDocumentData
  wallet: T
}

export function getUserFromFirestoreData<T extends Wallet>(args: GetUserFromFirestoreDataArgs<T>): User {
  return applySpec<User>({
    username: path(['user', 'username']),
    discord: pipe(nonNullableReturn(path(['user', 'discord'])), omit(['id', 'discriminator'])),
    wallet: pipe<[GetUserFromFirestoreDataArgs<T>], T, Wallet>(prop('wallet'), mapWalletDocumentDataToWallet)
  })(args)
}
