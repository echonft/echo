import type { CollectionContract } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'

export type PartialNft = Omit<Nft, 'collection' | 'tokenIdLabel'> & Record<'collection', CollectionContract>
