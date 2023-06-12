import { buildNftCollection } from '../../builders/nft-collection/build-nft-collection'
import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreNftCollectionData, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partialRight, pipe, unless } from 'ramda'

export const addNftCollection: (
  nftCollectionPrototype: FirestoreNftCollectionPrototype
) => Promise<R.Result<FirestoreNftCollectionData, Error>> = (nftPrototype) =>
  pipe(
    buildNftCollection,
    andThen(partialRight(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.NFT_COLLECTIONS).doc()])),
    andThen(
      pipe(
        unless(R.isError, pipe(R.getExn, convertNftCollection, R.fromPromise)),
        castAs<Promise<R.Result<FirestoreNftCollectionData, Error>>>
      )
    )
  )(nftPrototype)
