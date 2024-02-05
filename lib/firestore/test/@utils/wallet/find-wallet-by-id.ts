import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { pipe } from 'ramda'

export function findWalletById(id: string): Promise<Nullable<WalletDocumentData>> {
  return pipe(getWalletsCollectionReference, queryWhere('id', '==', id), getQueryUniqueData)()
}
