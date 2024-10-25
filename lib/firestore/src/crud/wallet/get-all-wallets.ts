import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQueryData } from '@echo/firestore/helpers/crud/query/get-query-data'
import type { Wallet } from '@echo/model/types/wallet'
import { pipe } from 'ramda'

export function getAllWallets(): Promise<Wallet[]> {
  return pipe(getWalletsCollectionReference, getQueryData)()
}
