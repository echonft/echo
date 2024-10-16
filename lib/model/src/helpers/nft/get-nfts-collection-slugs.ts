import { getNftCollectionSlug } from '@echo/model/helpers/nft/get-nft-collection-slug'
import type { Collection } from '@echo/model/types/collection/collection'
import type { Slug } from '@echo/model/types/slug'
import { stringComparator } from '@echo/utils/comparators/string-comparator'
import { map, pipe, sort, uniq } from 'ramda'

export function getNftsCollectionSlugs(nfts: Record<'collection', Pick<Collection, 'slug'>>[]): Slug[] {
  return pipe<[Record<'collection', Pick<Collection, 'slug'>>[]], Slug[], Slug[], Slug[]>(
    map(getNftCollectionSlug),
    uniq,
    sort(stringComparator)
  )(nfts)
}
