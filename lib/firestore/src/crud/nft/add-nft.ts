import { buildNft } from '../../builders/nft/build-nft'
import { CollectionName } from '../../config/collection-name'
import { convertNft } from '../../converters/nft/convert-nft'
import { FirestoreNftData } from '../../types/model/data/nft/firestore-nft-data'
import { FirestoreNftPrototype } from '../../types/prototypes/nft/firestore-nft-prototype'
import { getCollectionFromPath } from '../../utils/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../utils/document/set-doc-and-return-snapshot'
import { andThen, partial, pipe } from 'ramda'

export const addNft: (nftPrototype: FirestoreNftPrototype) => Promise<FirestoreNftData> = pipe(
  buildNft,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.NFTS).doc()])),
  andThen(convertNft)
)
