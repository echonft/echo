/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CollectionName } from '../../config/collection-name'
import { convertNft } from '../../converters/nft/convert-nft'
import { FirestoreNftData } from '../../types/model/data/nft/firestore-nft-data'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import {
  Arguments as GetNftCollectionArguments,
  getNftCollectionSnapshotByContractAddress
} from '../nft-collection/get-nft-collection-snapshot-by-contract-address'
import { errorPromise } from '@echo/utils'
import { always, andThen, call, converge, head, ifElse, isEmpty, partial, pipe, prop, useWith } from 'ramda'

interface Arguments {
  contract: GetNftCollectionArguments
  tokenId: number
}

export const findNftByCollection = (args: Arguments): Promise<FirestoreNftData> =>
  // @ts-ignore
  pipe(
    // @ts-ignore
    getNftCollectionSnapshotByContractAddress,
    andThen(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pipe(
        // @ts-ignore
        converge(call, [
          useWith(partial(whereCollection, ['collection', '==']), [prop('ref')]),
          always(whereCollection('tokenId', '==', args.tokenId)(getCollectionFromPath(CollectionName.NFTS)))
        ]),
        getCollectionDocs,
        andThen(ifElse(isEmpty, errorPromise('nft not found'), pipe(head, convertNft)))
      )
    )
  )(args.contract)
