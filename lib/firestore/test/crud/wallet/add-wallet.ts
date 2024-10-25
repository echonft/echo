import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { setReference } from '@echo/firestore/helpers/crud/reference/set-reference'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'

export async function addWallet(data: WalletDocumentData): Promise<string> {
  return setReference({
    collectionReference: getWalletsCollectionReference(),
    data
  })
}
