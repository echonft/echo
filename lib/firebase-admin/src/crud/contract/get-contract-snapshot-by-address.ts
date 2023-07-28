import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreContractData } from '@echo/firestore'
import { castAsNonNullable, errorPromise } from '@echo/utils'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

interface ContractQuery {
  address: string
  chainId: number
}

export const getContractSnapshotByAddress = (
  query: ContractQuery
): Promise<QueryDocumentSnapshot<FirestoreContractData>> =>
  pipe(
    getCollectionFromPath<FirestoreContractData>,
    whereCollection('address', '==', query.address),
    whereCollection('chainId', '==', query.chainId),
    getCollectionDocs<FirestoreContractData>,
    andThen(
      ifElse(
        isEmpty,
        errorPromise<QueryDocumentSnapshot<FirestoreContractData>>('contract not found'),
        pipe(head<QueryDocumentSnapshot<FirestoreContractData>>, castAsNonNullable)
      )
    )
  )(CollectionName.CONTRACTS)
