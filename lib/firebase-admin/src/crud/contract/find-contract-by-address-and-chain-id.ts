import { convertContract } from '../../converters/contract/convert-contract'
import { ContractQuery } from '../../types/query/contract-query'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { CollectionName, FirestoreContractData } from '@echo/firestore'
import { castAs, errorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, head, ifElse, isEmpty, pipe } from 'ramda'

export const findContractByAddressAndChainId = (
  query: ContractQuery
): Promise<R.Result<FirestoreContractData, Error>> =>
  pipe(
    getCollectionFromPath,
    whereCollection('address', '==', query.address),
    whereCollection('chainId', '==', query.chainId),
    getCollectionDocs,
    andThen(
      ifElse(
        isEmpty,
        pipe(errorPromise<FirestoreContractData>('not found'), R.fromPromise<FirestoreContractData>),
        pipe(head, castAs, convertContract, R.fromPromise<FirestoreContractData>)
      )
    )
  )(CollectionName.CONTRACTS)
