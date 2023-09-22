import type { FirestoreNftCollection } from '@echo/firestore/types/model/nft-collection/firestore-nft-collection'
import { nftCollectionMock } from '@echo/firestore-mocks/nft-collection/nft-collection-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllNftCollectionMocks() {
  return Object.values(nftCollectionMock) as NonEmptyArray<FirestoreNftCollection>
}
