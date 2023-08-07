import { CollectionName } from '../../config/collection-name'
import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { mapNftCollection } from '../../mappers/nft-collection/map-nft-collection'
import { FirestoreNftCollection } from '../../types/model/collections/nft-collection/firestore-nft-collection'
import { getDocSnapshotFromPath } from '../../utils/document/get-doc-snapshot-from-path'
import { NftCollection } from '@echo/model'
import { andThen, partial, pipe } from 'ramda'

export const findNftCollectionById: (collectionId: string) => Promise<NftCollection> = pipe(
  partial(getDocSnapshotFromPath<FirestoreNftCollection>, [CollectionName.NFT_COLLECTIONS]),
  andThen(pipe(convertNftCollection, mapNftCollection))
)
