import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { NftIndex } from '@echo/model/types/nft-index'
import { modify, pick, pipe } from 'ramda'

export function mapNftToNftIndex(nft: Nft | (Partial<Nft> & NftIndex)): NftIndex {
  return pipe<[Nft | (Partial<Nft> & NftIndex)], Pick<Nft, 'collection' | 'tokenId'>, NftIndex>(
    pick(['collection', 'tokenId']),
    modify<'collection', Collection, Pick<Collection, 'slug'>>('collection', pick(['slug']))
  )(nft)
}
