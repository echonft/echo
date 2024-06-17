import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Collection } from '@echo/model/types/collection'
import type { Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

export function getCollectionByAddressSnapshot(wallet: Wallet): Promise<Nullable<QueryDocumentSnapshot<Collection>>> {
  return pipe(
    getCollectionsCollectionReference,
    queryWhere<Collection>('contract.address', '==', wallet.address),
    queryWhere<Collection>('contract.chain', '==', wallet.chain),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getCollectionByAddress(wallet: Wallet): Promise<Nullable<Collection>> {
  return pipe(getCollectionByAddressSnapshot, andThen(getDocumentSnapshotData))(wallet)
}
