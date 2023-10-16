import { nftMock } from '@echo/firestore-mocks/nft/nft-mock'
import type { Nft } from '@echo/model/types/nft'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'

export function getAllNftMocks() {
  return Object.values(nftMock) as NonEmptyArray<Nft>
}
