import type { CollectionContract } from '@echo/model/types/collection/collection'
import type { Nft } from '@echo/model/types/nft/nft'

export type PartialNft = Omit<Nft, 'collection' | 'tokenIdLabel'> & Record<'collection', CollectionContract>
