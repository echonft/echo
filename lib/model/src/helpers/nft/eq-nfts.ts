import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { eqNftOwner } from '@echo/model/helpers/nft/eq-nft-owner'
import type { Nft } from '@echo/model/types/nft'
import { eqListContentWith } from '@echo/utils/fp/eq-list-content-with'
import { allPass } from 'ramda'

export function eqNfts(nftsA: Nft[], nftsB: Nft[], compareOwner?: boolean): boolean {
  return eqListContentWith<Nft>(compareOwner ? allPass([eqNftOwner, eqNft]) : eqNft)(nftsA, nftsB)
}
