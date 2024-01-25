import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { type Wallet } from '@echo/model/types/wallet'
import { pipe, toLower } from 'ramda'

export function findWalletByAddress(wallet: Wallet): Promise<WalletDocumentData | undefined> {
  return pipe(
    getWalletsCollectionReference,
    queryWhere<WalletDocumentData>('address', '==', toLower(wallet.address)),
    queryWhere<WalletDocumentData>('chainId', '==', wallet.chainId),
    getQueryUniqueData
  )()
}
