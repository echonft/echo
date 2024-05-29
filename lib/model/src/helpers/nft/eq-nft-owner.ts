import { eqUser } from '@echo/model/helpers/user/eq-user'
import type { Nft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

function internalFn(nftA: Nft): (nftB: Nft) => boolean {
  return function (nftB: Nft) {
    return eqUser(nftA.owner, nftB.owner)
  }
}

export function eqNftOwner(nftA: Nft, nftB: Nft): boolean
export function eqNftOwner(nftA: Nft): (nftB: Nft) => boolean
export function eqNftOwner(nftA: Nft, nftB?: Nft): boolean | ((nftB: Nft) => boolean) {
  if (isNil(nftB)) {
    return internalFn(nftA)
  }
  return internalFn(nftA)(nftB)
}
