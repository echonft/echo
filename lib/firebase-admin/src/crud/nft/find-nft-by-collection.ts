/* eslint-disable @typescript-eslint/ban-ts-comment */
import { convertNft } from '../../converters/nft/convert-nft'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import {
  Arguments as GetNftCollectionArguments,
  getNftCollectionSnapshotByContractAddress
} from '../nft-collection/get-nft-collection-snapshot-by-contract-address'
import { CollectionName, FirestoreNftData } from '@echo/firestore'
import { andThenOtherwise, errorPromise, toErrorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, andThen, call, converge, head, ifElse, isEmpty, partial, pipe, prop, useWith } from 'ramda'

interface Arguments {
  contract: GetNftCollectionArguments
  tokenId: number
}

export const findNftByCollection = (args: Arguments): Promise<R.Result<FirestoreNftData, Error>> =>
  // @ts-ignore
  pipe(
    // @ts-ignore
    getNftCollectionSnapshotByContractAddress,
    andThenOtherwise(
      pipe(
        // @ts-ignore
        converge(call, [
          useWith(partial(whereCollection, ['collection', '==']), [prop('ref')]),
          always(whereCollection('tokenId', '==', args.tokenId)(getCollectionFromPath(CollectionName.NFTS)))
        ]),
        getCollectionDocs,
        andThen(
          ifElse(isEmpty, pipe(errorPromise('nft not found'), R.fromPromise), pipe(head, convertNft, R.fromPromise))
        )
      ),
      pipe(toErrorPromise, R.fromPromise)
    )
  )(args.contract)
