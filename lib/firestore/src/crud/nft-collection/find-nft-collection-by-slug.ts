import { convertNftCollection } from '../../converters/nft-collection/convert-nft-collection'
import { mapNftCollection } from '../../mappers/nft-collection/map-nft-collection'
import { getNftCollectionSnapshotBySlug } from './get-nft-collection-snapshot-by-slug'
import { NftCollection } from '@echo/model'
import { andThen, pipe } from 'ramda'

export const findNftCollectionBySlug: (slug: string) => Promise<NftCollection> = pipe(
  getNftCollectionSnapshotBySlug,
  andThen(pipe(convertNftCollection, mapNftCollection))
)
