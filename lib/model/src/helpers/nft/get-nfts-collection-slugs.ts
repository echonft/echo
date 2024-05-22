import { getNftCollectionSlug } from '@echo/model/helpers/nft/get-nft-collection-slug'
import type { Nft } from '@echo/model/types/nft'
import { stringComparator } from '@echo/utils/comparators/string-comparator'
import { map, pipe, sort, uniq } from 'ramda'

export function getNftsCollectionSlugs(nfts: Nft[]) {
  return pipe<[Nft[]], Lowercase<string>[], Lowercase<string>[], Lowercase<string>[]>(
    map(getNftCollectionSlug),
    uniq,
    sort(stringComparator)
  )(nfts)
}
