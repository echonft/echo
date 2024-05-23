import { eqUser } from '@echo/model/helpers/user/eq-user'
import type { Nft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

function internalFn<T extends Nft>(nftA: T): (nftB: T) => boolean {
  return function (nftB: T) {
    return eqUser(nftA.owner, nftB.owner)
  }
}

export function eqNftOwner<T extends Nft>(nftA: T, nftB: T): boolean
export function eqNftOwner<T extends Nft>(nftA: T): (nftB: T) => boolean
export function eqNftOwner<T extends Nft>(nftA: T, nftB?: T): boolean | ((nftB: T) => boolean) {
  if (isNil(nftB)) {
    return internalFn(nftA)
  }
  return internalFn(nftA)(nftB)
}
