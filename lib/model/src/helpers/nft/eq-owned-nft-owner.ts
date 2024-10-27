import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import { eqUser } from '@echo/model/helpers/user/eq-user'
import type { Nft } from '@echo/model/types/nft'
import { eqPropsWith } from '@echo/utils/helpers/eq-props-with'
import { isNil } from 'ramda'

function innerEqOwnedNftOwner(nftA: Nft): (nftB: Nft) => boolean {
  return function (nftB: Nft) {
    if (!isOwnedNft(nftA)) {
      return !isOwnedNft(nftB)
    }
    if (!isOwnedNft(nftB)) {
      return false
    }
    return eqPropsWith('owner', eqUser, nftA, nftB)
  }
}

export function eqOwnedNftOwner(nftA: Nft, nftB: Nft): boolean
export function eqOwnedNftOwner(nftA: Nft): (nftB: Nft) => boolean
export function eqOwnedNftOwner(nftA: Nft, nftB?: Nft): boolean | ((nftB: Nft) => boolean) {
  if (isNil(nftB)) {
    return innerEqOwnedNftOwner(nftA)
  }
  return innerEqOwnedNftOwner(nftA)(nftB)
}
