import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getQuerySnapshot } from '@echo/firestore/helpers/crud/query/get-query-snapshot'
import { getQuerySnapshotData } from '@echo/firestore/helpers/crud/query/get-query-snapshot-data'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { andThen, pipe } from 'ramda'

export function getAllWallets(): Promise<WalletDocumentData[]> {
  return pipe(getWalletsCollectionReference, getQuerySnapshot, andThen(getQuerySnapshotData))()
}
