import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'

export type NftDocumentData = Omit<Nft, 'collection' | 'tokenIdLabel'> & Record<'collection', Collection>
