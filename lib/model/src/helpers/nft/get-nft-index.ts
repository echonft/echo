import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { modify, pick, pipe } from 'ramda'

type PartialCollection = Partial<Collection> & Required<Pick<Collection, 'slug'>>
type PartialNft = Omit<Partial<Nft>, 'collection'> &
  Required<Pick<Nft, 'tokenId'>> & {
    collection: PartialCollection
  }

export function getNftIndex(nft: Nft | PartialNft): NftIndex {
  return pipe<[Nft | PartialNft], Pick<PartialNft, 'collection' | 'tokenId'>, NftIndex>(
    pick(['collection', 'tokenId']),
    modify<'collection', PartialCollection, Pick<PartialCollection, 'slug'>>('collection', pick(['slug']))
  )(nft)
}
