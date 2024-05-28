import type { Collection } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft-index'
import { applySpec, path, prop } from 'ramda'

interface MapCollectionTokenIdToNftIndexArgs {
  collection: Collection
  tokenId: number
}

export function mapCollectionTokenIdToNftIndex(args: MapCollectionTokenIdToNftIndexArgs): NftIndex {
  return applySpec<NftIndex>({ tokenId: prop('tokenId'), slug: path(['collection', 'slug']) })(args)
}
