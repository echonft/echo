import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { FirestoreNftCollectionData } from '../../types/model/data/nft-collection/firestore-nft-collection-data'
import { getNftCollectionSnapshotBySlug } from './get-nft-collection-snapshot-by-slug'
import { andThen, pipe } from 'ramda'

export const findNftCollectionBySlug: (slug: string) => Promise<FirestoreNftCollectionData> = pipe(
  getNftCollectionSnapshotBySlug,
  andThen(convertNftCollection)
)
