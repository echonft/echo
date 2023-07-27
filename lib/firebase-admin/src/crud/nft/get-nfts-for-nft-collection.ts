/* eslint-disable @typescript-eslint/ban-ts-comment */
import { convertNft } from '../../converters/nft/convert-nft'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import {
  Arguments,
  getNftCollectionSnapshotByContractAddress
} from '../nft-collection/get-nft-collection-snapshot-by-contract-address'
import { CollectionName, FirestoreNftCollectionData, FirestoreNftData } from '@echo/firestore'
import { andThenOtherwise, promiseAll, toErrorPromise } from '@echo/utils'
import { QueryDocumentSnapshot } from '@google-cloud/firestore'
import { R } from '@mobily/ts-belt'
import { always, andThen, call, converge, map, partial, pipe, prop, useWith } from 'ramda'

export const getNftsForNftCollection = pipe<
  Arguments[],
  Promise<QueryDocumentSnapshot<FirestoreNftCollectionData>>,
  Promise<R.Result<FirestoreNftData[], Error>>
>(
  getNftCollectionSnapshotByContractAddress,
  andThenOtherwise<QueryDocumentSnapshot<FirestoreNftCollectionData>, R.Result<FirestoreNftData[], Error>>(
    pipe(
      // @ts-ignore
      converge(call, [
        useWith(partial(whereCollection, ['collection', '==']), [prop('ref')]),
        always(getCollectionFromPath(CollectionName.NFTS))
      ]),
      getCollectionDocs<FirestoreNftData>,
      andThen(pipe(map(convertNft), promiseAll, R.fromPromise<FirestoreNftData[]>))
    ),
    pipe(toErrorPromise, R.fromPromise<FirestoreNftData[]>)
  )
) as (args: Arguments) => Promise<R.Result<FirestoreNftData[], Error>>
