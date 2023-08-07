import { buildNftCollection } from '../../builders/nft-collection/build-nft-collection'
import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreNftCollectionData, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partial, pipe, unless } from 'ramda'

export const addNftCollection: (
  nftCollectionPrototype: FirestoreNftCollectionPrototype
) => Promise<R.Result<FirestoreNftCollectionData, Error>> = (nftPrototype) =>
  pipe(
    buildNftCollection,
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.NFT_COLLECTIONS).doc()])),
    andThen(
      pipe(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        unless(R.isError, pipe(R.getExn, convertNftCollection, R.fromPromise)),
        castAs<Promise<R.Result<FirestoreNftCollectionData, Error>>>
      )
    )
  )(nftPrototype)
