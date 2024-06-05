import { type Nft } from '@echo/model/types/nft'
import { nftMock } from '@echo/model-mocks/nft/nft-mock'
import { type NonEmptyArray } from 'ramda'

export function getAllNftMocks() {
  return Object.values(nftMock) as NonEmptyArray<Nft>
}
