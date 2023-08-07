/* eslint-disable @typescript-eslint/ban-ts-comment */
import { convertNft } from '../../converters/nft/convert-nft'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { CollectionName, FirestoreNftData } from '@echo/firestore'
import { promiseAll } from '@echo/utils'
import { always, andThen, call, converge, map, partial, pipe, prop, useWith } from 'ramda'

export const getNftsForOwner = pipe(
  // @ts-ignore
  partial(getDocSnapshot, [CollectionName.USERS]),
  andThen(
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
