import { eqOwnedNft } from '@echo/model/helpers/nft/eq-owned-nft'
import type { OwnedNft } from '@echo/model/types/nft'
import { eqListContentWith } from '@echo/utils/fp/eq-list-content-with'

export function eqOwnedNfts(nftsA: OwnedNft[], nftsB: OwnedNft[]): boolean {
  return eqListContentWith<OwnedNft>(eqOwnedNft)(nftsA, nftsB)
}
