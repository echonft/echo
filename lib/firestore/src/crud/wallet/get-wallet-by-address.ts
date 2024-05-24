import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet/wallet-document-data'
import { type Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe, toLower } from 'ramda'

export function getWalletSnapshotByAddress(
  wallet: Wallet
): Promise<Nullable<QueryDocumentSnapshot<WalletDocumentData>>> {
  return pipe(
    getWalletsCollectionReference,
    queryWhere<WalletDocumentData>('address', '==', toLower(wallet.address)),
    queryWhere<WalletDocumentData>('chain', '==', wallet.chain),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getWalletByAddress(wallet: Wallet): Promise<Nullable<WalletDocumentData>> {
  return pipe(getWalletSnapshotByAddress, andThen(getDocumentSnapshotData<WalletDocumentData>))(wallet)
}
