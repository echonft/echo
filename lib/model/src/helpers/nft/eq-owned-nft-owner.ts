import { eqUser } from '@echo/model/helpers/user/eq-user'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { isNil } from 'ramda'

function internalFn(nftA: Nft): (nftB: Nft) => boolean {
  return function (nftB: Nft) {
    if (propIsNil('owner', nftA)) {
      return propIsNil('owner', nftB)
    }
    if (propIsNil('owner', nftB)) {
      return propIsNil('owner', nftA)
    }
    return eqUser((nftA as OwnedNft).owner, (nftB as OwnedNft).owner)
  }
}

export function eqOwnedNftOwner(nftA: Nft, nftB: Nft): boolean
export function eqOwnedNftOwner(nftA: Nft): (nftB: Nft) => boolean
export function eqOwnedNftOwner(nftA: Nft, nftB?: Nft): boolean | ((nftB: Nft) => boolean) {
  if (isNil(nftB)) {
    return internalFn(nftA)
  }
  return internalFn(nftA)(nftB)
}
