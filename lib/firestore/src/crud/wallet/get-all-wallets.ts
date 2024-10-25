import { walletsCollection } from '@echo/firestore/helpers/collection/collections'
import { getQueryData } from '@echo/firestore/helpers/query/get-query-data'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import { pipe } from 'ramda'

export function getAllWallets(): Promise<WalletDocument[]> {
  return pipe(walletsCollection, getQueryData)()
}
