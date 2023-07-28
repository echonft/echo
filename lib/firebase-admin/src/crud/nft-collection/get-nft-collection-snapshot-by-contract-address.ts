/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { getContractSnapshotByAddress } from '../contract/get-contract-snapshot-by-address'
import { CollectionName, FirestoreContractData, FirestoreNftCollectionData } from '@echo/firestore'
import { castAsNonNullable, errorPromise } from '@echo/utils'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { always, andThen, call, converge, head, ifElse, isEmpty, partial, pipe, prop, useWith } from 'ramda'

export interface Arguments {
  address: string
  chainId: number
}

export const getNftCollectionSnapshotByContractAddress = pipe<
  Arguments[],
  Promise<QueryDocumentSnapshot<FirestoreContractData>>,
  Promise<QueryDocumentSnapshot<FirestoreNftCollectionData>>
>(
  getContractSnapshotByAddress,
  // @ts-ignore
  andThen(
    pipe(
      // @ts-ignore
      converge(call, [
        useWith(partial(whereCollection, ['contract', '==']), [prop('ref')]),
        always(getCollectionFromPath(CollectionName.NFT_COLLECTIONS))
      ]),
      getCollectionDocs,
      andThen(
        ifElse(
          isEmpty,
          errorPromise<QueryDocumentSnapshot<FirestoreNftCollectionData>>('nft collection not found'),
          pipe(head<QueryDocumentSnapshot<FirestoreNftCollectionData>>, castAsNonNullable)
        )
      )
    )
  )
) as (args: Arguments) => Promise<QueryDocumentSnapshot<FirestoreNftCollectionData>>
