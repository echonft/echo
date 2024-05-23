import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { eqNftOwner } from '@echo/model/helpers/nft/eq-nft-owner'
import type { Nft } from '@echo/model/types/nft'
import { eqListContentWith } from '@echo/utils/fp/eq-list-content-with'
import { allPass } from 'ramda'

export function eqNfts<T extends Nft>(nftsA: T[], nftsB: T[], compareOwner?: boolean): boolean {
  return eqListContentWith<T>(compareOwner ? allPass([eqNftOwner, eqNft]) : eqNft)(nftsA, nftsB)
}
