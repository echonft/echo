import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'

export type PartialNft = Omit<Nft, 'collection' | 'owner' | 'updatedAt'> &
  Record<'collection', Pick<Collection, 'contract'>>
