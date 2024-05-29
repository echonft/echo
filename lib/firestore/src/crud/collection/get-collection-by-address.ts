import { getCollectionsCollectionReference } from '@echo/firestore/helpers/collection-reference/get-collections-collection-reference'
import { getDocumentSnapshotData } from '@echo/firestore/helpers/crud/document/get-document-snapshot-data'
import { getQueryUniqueDocumentSnapshot } from '@echo/firestore/helpers/crud/query/get-query-unique-document-snapshot'
import { queryWhere } from '@echo/firestore/helpers/crud/query/query-where'
import type { Collection } from '@echo/model/types/collection'
import type { ChainName } from '@echo/utils/types/chain-name'
import type { HexString } from '@echo/utils/types/hex-string'
import type { Nullable } from '@echo/utils/types/nullable'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
import { andThen, pipe } from 'ramda'

interface GetCollectionByAddressArgs {
  address: Lowercase<HexString>
  chain: ChainName
}
export function getCollectionByAddressSnapshot(
  args: GetCollectionByAddressArgs
): Promise<Nullable<QueryDocumentSnapshot<Collection>>> {
  return pipe(
    getCollectionsCollectionReference,
    queryWhere<Collection>('contract.address', '==', args.address),
    queryWhere<Collection>('contract.chain', '==', args.chain),
    getQueryUniqueDocumentSnapshot
  )()
}

export function getCollectionByAddress(args: GetCollectionByAddressArgs): Promise<Nullable<Collection>> {
  return pipe(getCollectionByAddressSnapshot, andThen(getDocumentSnapshotData))(args)
}
