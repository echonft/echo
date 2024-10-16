import { eqNft } from '@echo/model/helpers/nft/eq-nft'
import { eqOwnedNftOwner } from '@echo/model/helpers/nft/eq-owned-nft-owner'
import type { Nft } from '@echo/model/types/nft/nft'
import { allPass, isNil } from 'ramda'

export function eqOwnedNft(nftA: Nft, nftB: Nft): boolean
export function eqOwnedNft(nftA: Nft): (nftB: Nft) => boolean
export function eqOwnedNft(nftA: Nft, nftB?: Nft): boolean | ((nftB: Nft) => boolean) {
  if (isNil(nftB)) {
    return allPass([eqOwnedNftOwner, eqNft])(nftA)
  }
  return allPass([eqOwnedNftOwner, eqNft])(nftA, nftB)
}
