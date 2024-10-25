import { getWalletsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-wallets-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { WalletDocumentData } from '@echo/firestore/types/model/wallet-document-data'
import type { Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe, toLower } from 'ramda'

export function getWalletSnapshot(
  wallet: Wallet
): Promise<Nullable<QueryDocumentSnapshot<Wallet, WalletDocumentData>>> {
  return pipe(
    getWalletsCollectionReference,
    queryWhere('address', '==', toLower(wallet.address)),
    queryWhere('vm', '==', wallet.vm),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getWallet(wallet: Wallet): Promise<Nullable<Wallet>> {
  return pipe(getWalletSnapshot, andThen(getDocumentSnapshotData))(wallet)
}
