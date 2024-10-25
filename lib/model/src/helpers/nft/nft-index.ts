import { collectionIndex } from '@echo/model/helpers/collection/collection-index'
import type { CollectionIndex } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft'
import { modify, pick, pipe } from 'ramda'

export function nftIndex(nft: NftIndex): NftIndex {
  return pipe<[NftIndex], NftIndex, NftIndex>(
    pick(['collection', 'tokenId']),
    modify<'collection', CollectionIndex, CollectionIndex>('collection', collectionIndex)
  )(nft)
}
