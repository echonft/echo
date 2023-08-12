import { CollectionName } from '../../config/collection-name'
import { FirestoreSnapshot } from '../../types/abstract/firestore-snapshot'
import { FirestoreNftCollection } from '../../types/model/collections/nft-collection/firestore-nft-collection'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { getContractSnapshotByAddress } from '../contract/get-contract-snapshot-by-address'
import { errorPromise } from '@echo/utils'
import { always, andThen, call, converge, head, ifElse, isEmpty, partial, pipe, prop, useWith } from 'ramda'

export interface Arguments {
  address: string
  chainId: number
}

export const getNftCollectionSnapshotByContractAddress = pipe(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getContractSnapshotByAddress,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  andThen(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    pipe(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      converge(call, [
        useWith(partial(whereCollection, ['contract', '==']), [prop('ref')]),
        always(getCollectionFromPath(CollectionName.NFT_COLLECTIONS))
      ]),
      getCollectionDocs,
      andThen(ifElse(isEmpty, errorPromise('nft collection not found'), head))
    )
  )
) as (args: Arguments) => Promise<FirestoreSnapshot<FirestoreNftCollection>>
