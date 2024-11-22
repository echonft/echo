import { nftCollectionSlug } from '@echo/model/helpers/nft/nft-collection-slug'
import type { NftIndex } from '@echo/model/types/nft'
import { map, pipe, uniq } from 'ramda'

export function nftsCollectionSlug<T extends NftIndex>(nfts: T[]): Lowercase<string>[] {
  return pipe<[T[]], Lowercase<string>[], Lowercase<string>[]>(map(nftCollectionSlug), uniq)(nfts)
}
