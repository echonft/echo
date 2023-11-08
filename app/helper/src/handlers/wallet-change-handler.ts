import { findUserById } from '@echo/firestore/crud/user/find-user-by-id'
import { getUser } from '@echo/firestore/helpers/user/get-user'
import { type DocumentChangeType } from '@echo/firestore/types/abstract/document-change-type'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { updateUserNfts } from '@echo/helper/services/nft/update-user-nfts'
import { isNotNil } from 'ramda'

export async function walletChangeHandler(changeType: DocumentChangeType, wallet: WalletDocumentData) {
  if (changeType === 'added' || changeType === 'removed') {
    const user = await findUserById(wallet.userId)
    if (isNotNil(user)) {
      await updateUserNfts(getUser(user, wallet))
    }
  }
}
