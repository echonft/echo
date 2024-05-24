import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'

export interface NftIndex extends Pick<Nft, 'tokenId'> {
  collection: Pick<Collection, 'slug'>
}
