/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CollectionName } from '../../constants/collection-name'
import { convertNft } from '../../converters/nft/convert-nft'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { whereCollection } from '../../helpers/collection/where-collection'
import { FirestoreNftData } from '../../types/model/data/nft/firestore-nft-data'
import {
  Arguments,
  getNftCollectionSnapshotByContractAddress
} from '../nft-collection/get-nft-collection-snapshot-by-contract-address'
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
