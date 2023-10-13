import { nftCollectionMock } from '@echo/firestore-mocks/nft-collection/nft-collection-mock'
import type { Collection } from '@echo/model/types/collection'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllNftCollectionMocks() {
  return Object.values(nftCollectionMock) as NonEmptyArray<Collection>
}
