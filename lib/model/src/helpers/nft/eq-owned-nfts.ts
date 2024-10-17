import { eqOwnedNft } from '@echo/model/helpers/nft/eq-owned-nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { eqListWith } from '@echo/utils/fp/eq-list-with'

export function eqOwnedNfts(nftsA: OwnedNft[], nftsB: OwnedNft[]): boolean {
  return eqListWith<OwnedNft>(eqOwnedNft, nftsA, nftsB)
}
