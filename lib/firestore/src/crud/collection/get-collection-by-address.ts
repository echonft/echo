import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { CollectionDocumentData } from '@echo/firestore/types/model/collection-document-data'
import type { Collection } from '@echo/model/types/collection'
import type { Contract } from '@echo/model/types/contract'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

function getCollectionByAddressSnapshot(
  contract: Contract
): Promise<Nullable<QueryDocumentSnapshot<Collection, CollectionDocumentData>>> {
  return pipe(
    getCollectionsCollectionReference,
    queryWhere('contract.address', '==', contract.address),
    queryWhere('contract.chain', '==', contract.chain),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getCollectionByAddress(contract: Contract): Promise<Nullable<Collection>> {
  return pipe(getCollectionByAddressSnapshot, andThen(getDocumentSnapshotData))(contract)
}
