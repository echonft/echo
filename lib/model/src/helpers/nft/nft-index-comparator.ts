import type { NftIndex } from '@echo/model/types/nft-index'
import { stringComparator } from '@echo/utils/comparators/string-comparator'

export function nftIndexComparator(indexA: NftIndex, indexB: NftIndex) {
  const collectionDiff = stringComparator(indexA.collection.slug, indexB.collection.slug)
  if (collectionDiff === 0) {
    return indexA.tokenId - indexB.tokenId
  }
  return collectionDiff
}
