import type { CollectionSwapsCount } from '@echo/firestore/types/model/collection-swaps-count/collection-swaps-count'
import { nftCollectionSwapsCountMock } from '@echo/firestore-mocks/nft-collection-swaps-count/nft-collection-swaps-count-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllNftCollectionSwapsCountMocks() {
  return Object.values(nftCollectionSwapsCountMock) as NonEmptyArray<CollectionSwapsCount>
}
