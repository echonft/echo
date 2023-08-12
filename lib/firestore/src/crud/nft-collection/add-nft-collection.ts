import { buildNftCollection } from '../../builders/nft-collection/build-nft-collection'
import { CollectionName } from '../../config/collection-name'
import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { FirestoreNftCollectionData } from '../../types/model/data/nft-collection/firestore-nft-collection-data'
import { FirestoreNftCollectionPrototype } from '../../types/prototypes/nft-collection/firestore-nft-collection-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
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
