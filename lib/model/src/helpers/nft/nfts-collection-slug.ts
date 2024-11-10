import { nftCollectionSlug } from '@echo/model/helpers/nft/nft-collection-slug'
import type { NftIndex } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import { map, pipe, uniq } from 'ramda'

export function nftsCollectionSlug<T extends NftIndex>(nfts: T[]): Slug[] {
  return pipe<[T[]], Slug[], Slug[]>(map(nftCollectionSlug), uniq)(nfts)
}
