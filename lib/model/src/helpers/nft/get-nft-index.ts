import { getCollectionIndex } from '@echo/model/helpers/collection/get-collection-index'
import type { CollectionIndex } from '@echo/model/types/collection'
import type { NftIndex } from '@echo/model/types/nft'
import type { Strict } from '@echo/utils/types/strict'
import { modify, pick, pipe } from 'ramda'

export function getNftIndex(nft: NftIndex): Strict<NftIndex, NftIndex> {
  return pipe<[NftIndex], NftIndex, Strict<NftIndex, NftIndex>>(
    pick(['collection', 'tokenId']),
    modify<'collection', CollectionIndex, CollectionIndex>('collection', getCollectionIndex)
  )(nft)
}
