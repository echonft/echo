import { buildNftCollection } from '../../builders/nft-collection/build-nft-collection'
import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { CollectionName, FirestoreNftCollectionData, FirestoreNftCollectionPrototype } from '@echo/firestore'
import { andThen, partial, pipe } from 'ramda'

export const addNftCollection: (
  nftCollectionPrototype: FirestoreNftCollectionPrototype
) => Promise<FirestoreNftCollectionData> = pipe(
  buildNftCollection,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.NFT_COLLECTIONS).doc()])),
  andThen(convertNftCollection)
)
