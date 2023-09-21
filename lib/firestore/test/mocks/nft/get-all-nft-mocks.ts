import type { FirestoreNft } from '@echo/firestore/types/model/nft/firestore-nft'
import { nftMock } from '@echo/firestore-mocks/nft/nft-mock'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllNftMocks() {
  return Object.values(nftMock) as NonEmptyArray<FirestoreNft>
}
