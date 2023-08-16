/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CollectionName } from '../../constants/collection-name'
import { convertNft } from '../../converters/nft/convert-nft'
import { getCollectionDocs } from '../../helpers/collection/get-collection-docs'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { whereCollection } from '../../helpers/collection/where-collection'
import { getDocSnapshot } from '../../helpers/document/get-doc-snapshot'
import { FirestoreNftData } from '../../types/model/data/nft/firestore-nft-data'
import { promiseAll } from '@echo/utils'
import { always, andThen, call, converge, map, partial, pipe, prop, useWith } from 'ramda'

export const getNftsForOwner = pipe(
  // @ts-ignore
  partial(getDocSnapshot, [CollectionName.USERS]),
  andThen(
    // @ts-ignore
    pipe(
      // @ts-ignore
      converge(call, [
        useWith(partial(whereCollection, ['owner', '==']), [prop('ref')]),
        always(getCollectionFromPath(CollectionName.NFTS))
      ]),
      getCollectionDocs<FirestoreNftData>,
      andThen(pipe(map(convertNft), promiseAll))
    )
  )
) as (userId: string) => Promise<FirestoreNftData[]>
