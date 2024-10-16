import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { CollectionDocumentData } from '@echo/firestore/types/model/collection-document-data'
import type { Collection } from '@echo/model/types/collection/collection'
import type { Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getCollectionByAddressSnapshot(
  wallet: Wallet
): Promise<Nullable<QueryDocumentSnapshot<Collection, CollectionDocumentData>>> {
  return pipe(
    getCollectionsCollectionReference,
    queryWhere('contract.address', '==', wallet.address),
    queryWhere('contract.chain', '==', wallet.chain),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getCollectionByAddress(wallet: Wallet): Promise<Nullable<Collection>> {
  return pipe(getCollectionByAddressSnapshot, andThen(getDocumentSnapshotData))(wallet)
}
