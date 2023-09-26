import type { FirestoreNftCollectionSwapsCount } from '@echo/firestore/types/model/nft-collection-swaps-count/firestore-nft-collection-swaps-count'
import { nftCollectionSwapsCountMock } from '@echo/firestore-mocks/nft-collection-swaps-count/nft-collection-swaps-count-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllNftCollectionSwapsCountMocks() {
  return Object.values(nftCollectionSwapsCountMock) as NonEmptyArray<FirestoreNftCollectionSwapsCount>
}
