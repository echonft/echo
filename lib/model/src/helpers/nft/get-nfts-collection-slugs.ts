import { getNftCollectionSlug } from '@echo/model/helpers/nft/get-nft-collection-slug'
import type { Nft } from '@echo/model/types/nft'
import type { Slug } from '@echo/model/types/slug'
import { stringComparator } from '@echo/utils/comparators/string-comparator'
import { map, pipe, sort, uniq } from 'ramda'

export function getNftsCollectionSlugs(nfts: Nft[]): Slug[] {
  return pipe<[Nft[]], Slug[], Slug[], Slug[]>(map(getNftCollectionSlug), uniq, sort(stringComparator))(nfts)
}
