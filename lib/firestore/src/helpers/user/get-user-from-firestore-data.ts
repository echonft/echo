import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import type { UserDocumentData } from '@echo/firestore/types/model/user-document-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import type { User } from '@echo/model/types/user'
import type { Wallet } from '@echo/model/types/wallet'
import { applySpec, omit, path, pipe, prop } from 'ramda'

interface GetUserFromFirestoreDataArgs {
  user: UserDocumentData
  wallet: Wallet | WalletDocumentData
}

export function getUserFromFirestoreData(args: GetUserFromFirestoreDataArgs): User {
  return applySpec<User>({
    username: path(['user', 'username']),
    discord: pipe(
      path<GetUserFromFirestoreDataArgs, 'user', 'discord'>(['user', 'discord']),
      omit(['id', 'discriminator'])
    ),
    wallet: pipe<[GetUserFromFirestoreDataArgs], Wallet | WalletDocumentData, Wallet>(prop('wallet'), (wallet) =>
      mapWalletDocumentDataToWallet(wallet as WalletDocumentData)
    )
  })(args)
}
