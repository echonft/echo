import { buildNft } from '../../builders/nft/build-nft'
import { convertNft } from '../../converters/nft/convert-nft'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreNftData, FirestoreNftPrototype } from '@echo/firestore'
import { andThen, partialRight, pipe } from 'ramda'

export const addNft: (nftPrototype: FirestoreNftPrototype) => Promise<FirestoreNftData> = (nftPrototype) =>
  pipe(
    buildNft,
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.NFTS).doc()])),
    andThen(convertNft)
  )(nftPrototype)
