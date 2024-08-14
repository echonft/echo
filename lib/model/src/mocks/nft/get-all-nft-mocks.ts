import { nftMock } from '@echo/model/mocks/nft/nft-mock'
import { type OwnedNft } from '@echo/model/types/nft'
import { type NonEmptyArray } from 'ramda'

export function getAllNftMocks() {
  return Object.values(nftMock()) as NonEmptyArray<OwnedNft>
}
