import type { Address } from '@echo/model/types/address'
import type { CollectionContract } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'

export interface PartialNft extends Omit<Nft, 'collection' | 'owner'> {
  collection: CollectionContract
  owner: Address
}
