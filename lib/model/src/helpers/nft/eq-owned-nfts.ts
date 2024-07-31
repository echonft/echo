import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { eqOwnedNftOwner } from '@echo/model/helpers/nft/eq-owned-nft-owner'
import type { OwnedNft } from '@echo/model/types/nft'
import { eqListContentWith } from '@echo/utils/fp/eq-list-content-with'
import { allPass } from 'ramda'

export function eqOwnedNfts(nftsA: OwnedNft[], nftsB: OwnedNft[]): boolean {
  return eqListContentWith<OwnedNft>(allPass([eqOwnedNftOwner, eqNft]))(nftsA, nftsB)
}
