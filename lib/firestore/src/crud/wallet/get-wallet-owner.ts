import { getUserById } from '@echo/firestore/crud/user/get-user-by-id'
import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQueryUniqueData } from '@echo/firestore/helpers/crud/query/get-query-unique-data'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'
import type { PartialWallet } from '@echo/firestore/types/model/wallet/wallet-document-data'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, pipe } from 'ramda'

export async function getWalletOwner(wallet: PartialWallet): Promise<Nullable<UserDocumentData>> {
  const foundWallet = await pipe(
    getWalletsCollectionReference,
    queryWhere('address', '==', wallet.address),
    queryWhere('chain', '==', wallet.chain),
    getQueryUniqueData
  )()
  if (isNil(foundWallet)) {
    return undefined
  }
  return getUserById(foundWallet.userId)
}
