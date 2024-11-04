import { collectionsCollection } from '@echo/firestore/helpers/collection/collections'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/query/query-where'
import type { CollectionDocument } from '@echo/firestore/types/model/collection-document'
import type { Address } from '@echo/model/types/address'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

function getCollectionByContractSnapshot(
  contract: Address
): Promise<Nullable<QueryDocumentSnapshot<CollectionDocument>>> {
  return pipe(collectionsCollection, queryWhere('contract', '==', contract), getQueryUniqueDocumentSnapshot)()
}

export function getCollectionByContract(contract: Address): Promise<Nullable<CollectionDocument>> {
  return pipe(getCollectionByContractSnapshot, andThen(getDocumentSnapshotData))(contract)
}
