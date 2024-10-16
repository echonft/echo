import { collectionIndex } from '@echo/model/helpers/collection/collection-index'
import type { CollectionIndex } from '@echo/model/types/collection/collection'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { Strict } from '@echo/utils/types/strict'
import { modify, pick, pipe } from 'ramda'

export function nftIndex(nft: NftIndex): Strict<NftIndex, NftIndex> {
  return pipe<[NftIndex], NftIndex, Strict<NftIndex, NftIndex>>(
    pick(['collection', 'tokenId']),
    modify<'collection', CollectionIndex, CollectionIndex>('collection', collectionIndex)
  )(nft)
}
