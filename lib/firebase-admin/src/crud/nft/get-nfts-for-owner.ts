/* eslint-disable @typescript-eslint/ban-ts-comment */
import { convertNft } from '../../converters/nft/convert-nft'
import { getCollectionDocs } from '../../utils/collection/get-collection-docs'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { whereCollection } from '../../utils/collection/where-collection'
import { getDocSnapshot } from '../../utils/document/get-doc-snapshot'
import { CollectionName, FirestoreNftData, FirestoreSnapshot, FirestoreUserData } from '@echo/firestore'
import { andThenOtherwise, promiseAll, toErrorPromise } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { always, andThen, call, converge, map, partial, pipe, prop, useWith } from 'ramda'

export const getNftsForOwner = pipe<
  string[],
  Promise<FirestoreSnapshot<FirestoreUserData>>,
  Promise<R.Result<FirestoreNftData[], Error>>
>(
  // @ts-ignore
  partial(getDocSnapshot<FirestoreUserData>, [CollectionName.USERS]),
  andThenOtherwise<FirestoreSnapshot<FirestoreUserData>, R.Result<FirestoreNftData[], Error>>(
    pipe(
      // @ts-ignore
      converge(call, [
        useWith(partial(whereCollection, ['owner', '==']), [prop('ref')]),
        always(getCollectionFromPath(CollectionName.NFTS))
      ]),
      getCollectionDocs<FirestoreNftData>,
      andThen(pipe(map(convertNft), promiseAll, R.fromPromise<FirestoreNftData[]>))
    ),
    pipe(toErrorPromise, R.fromPromise<FirestoreNftData[]>)
  )
) as (userId: string) => Promise<R.Result<FirestoreNftData[], Error>>
