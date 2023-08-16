import { CollectionName } from '../../constants/collection-name'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { whereCollection } from '../../helpers/collection/where-collection'
import { FirestoreContractData } from '../../types/model/data/contract/firestore-contract-data'
import { errorPromise } from '@echo/utils'
import { QueryDocumentSnapshot } from 'firebase-admin/firestore'
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
