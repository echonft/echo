import { buildNft } from '../../builders/nft/build-nft'
import { convertNft } from '../../converters/nft/convert-nft'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreNftData, FirestoreNftPrototype } from '@echo/firestore'
import { castAs } from '@echo/utils'
import { R } from '@mobily/ts-belt'
import { andThen, partialRight, pipe, unless } from 'ramda'

export const addNft: (nftPrototype: FirestoreNftPrototype) => Promise<R.Result<FirestoreNftData, Error>> = (
  nftPrototype
) =>
  pipe(
    buildNft,
    andThen(partialRight(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.NFTS).doc()])),
    andThen(
      pipe(
        unless(R.isError, pipe(R.getExn, convertNft, R.fromPromise)),
        castAs<Promise<R.Result<FirestoreNftData, Error>>>
      )
    )
  )(nftPrototype)
