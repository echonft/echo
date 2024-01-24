import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { pipe } from 'ramda'

export function getAllWallets(): Promise<WalletDocumentData[]> {
  return pipe(getWalletsCollectionReference, getQueryData)()
}
