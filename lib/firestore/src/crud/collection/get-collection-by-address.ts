import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import type { Contract } from '@echo/model/types/contract'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

function getCollectionByAddressSnapshot(
  contract: Contract
): Promise<Nullable<QueryDocumentSnapshot<CollectionDocument>>> {
  return pipe(
    collectionsCollection,
    queryWhere('contract.address', '==', contract.address),
    queryWhere('contract.chain', '==', contract.chain),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getCollectionByAddress(contract: Contract): Promise<Nullable<CollectionDocument>> {
  return pipe(getCollectionByAddressSnapshot, andThen(getDocumentSnapshotData))(contract)
}
