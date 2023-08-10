import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreContractData } from '@echo/firestore'
import { errorPromise } from '@echo/utils'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

interface ContractQuery {
  address: string
  chainId: number
}

export const getContractSnapshotByAddress = (
  query: ContractQuery
): Promise<QueryDocumentSnapshot<FirestoreContractData>> =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  pipe(
    getCollectionFromPath,
    whereCollection('address', '==', query.address),
    whereCollection('chainId', '==', query.chainId),
    getCollectionDocs,
    andThen(ifElse(isEmpty, errorPromise('contract not found'), head))
  )(CollectionName.CONTRACTS)
