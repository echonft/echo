import type { Collection } from '@echo/model/types/collection'
import type { NftIndex, PartialNft } from '@echo/model/types/nft'
import type { DeepPartial } from '@echo/utils/types/deep-partial'
import { modify, pick, pipe } from 'ramda'

type PartialCollection = DeepPartial<Collection> & Required<Pick<Collection, 'slug'>>
export function getNftIndex(nft: PartialNft): NftIndex {
  return pipe<[PartialNft], Pick<PartialNft, 'collection' | 'tokenId'>, NftIndex>(
    pick(['collection', 'tokenId']),
    modify<'collection', PartialCollection, Pick<PartialCollection, 'slug'>>('collection', pick(['slug']))
  )(nft)
}
