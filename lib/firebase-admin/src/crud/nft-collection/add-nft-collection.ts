import { buildNftCollection } from '../../builders/nft-collection/build-nft-collection'
import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreNftCollectionData, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { andThen, partialRight, pipe } from 'ramda'

export const addNftCollection: (
  nftCollectionPrototype: FirestoreNftCollectionPrototype
) => Promise<FirestoreNftCollectionData> = (nftPrototype) =>
  pipe(
    buildNftCollection,
    andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.NFT_COLLECTIONS).doc()])),
    andThen(convertNftCollection)
  )(nftPrototype)
