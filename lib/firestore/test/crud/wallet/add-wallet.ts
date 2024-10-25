import { walletsCollection } from '@echo/firestore/helpers/collection/collections'
import { setReference } from '@echo/firestore/helpers/reference/set-reference'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'

export async function addWallet(data: WalletDocument): Promise<string> {
  return setReference({
    collectionReference: walletsCollection(),
    data
  })
}
