/* eslint-disable @typescript-eslint/ban-ts-comment */
import { convertNft } from '../../converters/nft/convert-nft'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import {
  Arguments,
  getNftCollectionSnapshotByContractAddress
} from '../nft-collection/get-nft-collection-snapshot-by-contract-address'
import { CollectionName, FirestoreNftData } from '@echo/firestore'
import { promiseAll } from '@echo/utils'
import { always, andThen, call, converge, map, partial, pipe, prop, useWith } from 'ramda'

export const getNftsForNftCollection = pipe(
  getNftCollectionSnapshotByContractAddress,
  andThen(
    pipe(
      // @ts-ignore
      converge(call, [
        useWith(partial(whereCollection, ['collection', '==']), [prop('ref')]),
        always(getCollectionFromPath(CollectionName.NFTS))
      ]),
      // @ts-ignore
      getCollectionDocs,
      andThen(pipe(map(convertNft), promiseAll))
    )
  )
) as (args: Arguments) => Promise<FirestoreNftData[]>
