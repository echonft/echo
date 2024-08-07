import type { CollectionContract, CollectionIndex } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'

export type PartialNft = Omit<Nft, 'collection'> & {
  collection: CollectionIndex & CollectionContract
}
