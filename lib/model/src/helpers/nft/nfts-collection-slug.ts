import { nftCollectionSlug } from '@echo/model/helpers/nft/nft-collection-slug'
import type { NftIndex } from '@echo/model/types/nft/nft'
import type { Slug } from '@echo/model/types/slug'
import { map, pipe, uniq } from 'ramda'

export function nftsCollectionSlug(nfts: NftIndex[]): Slug[] {
  return pipe<[NftIndex[]], Slug[], Slug[]>(map(nftCollectionSlug), uniq)(nfts)
}
