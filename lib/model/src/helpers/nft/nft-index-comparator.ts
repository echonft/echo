import { collectionComparator } from '@echo/model/helpers/collection/collection-comparator'
import { nftTokenIdComparator } from '@echo/model/helpers/nft/nft-token-id-comparator'
import type { NftIndex } from '@echo/model/types/nft-index'

export function nftIndexComparator(indexA: NftIndex, indexB: NftIndex) {
  const collectionDiff = collectionComparator(indexA.collection, indexB.collection)
  if (collectionDiff === 0) {
    return nftTokenIdComparator(indexA.tokenId, indexB.tokenId)
  }
  return collectionDiff
}
