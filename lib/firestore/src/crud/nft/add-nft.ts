import { buildNft } from '../../builders/nft/build-nft'
import { CollectionName } from '../../constants/collection-name'
import { convertNft } from '../../converters/nft/convert-nft'
import { getCollectionFromPath } from '../../helpers/collection/get-collection-from-path'
import { setDocAndReturnSnapshot } from '../../helpers/document/set-doc-and-return-snapshot'
import { FirestoreNftData } from '../../types/model/data/nft/firestore-nft-data'
import { FirestoreNftPrototype } from '../../types/prototypes/nft/firestore-nft-prototype'
import { andThen, partial, pipe } from 'ramda'

export const addNft: (nftPrototype: FirestoreNftPrototype) => Promise<FirestoreNftData> = pipe(
  buildNft,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  andThen(partial(setDocAndReturnSnapshot, [getCollectionFromPath(CollectionName.NFTS).doc()])),
  andThen(convertNft)
)
