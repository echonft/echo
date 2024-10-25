import { walletsCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { WalletDocument } from '@echo/firestore/types/model/wallet-document'
import type { Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe, toLower } from 'ramda'

export function getWalletSnapshot(wallet: Wallet): Promise<Nullable<QueryDocumentSnapshot<WalletDocument>>> {
  return pipe(
    walletsCollection,
    queryWhere('address', '==', toLower(wallet.address)),
    queryWhere('vm', '==', wallet.vm),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getWallet(wallet: Wallet): Promise<Nullable<WalletDocument>> {
  return pipe(getWalletSnapshot, andThen(getDocumentSnapshotData))(wallet)
}
