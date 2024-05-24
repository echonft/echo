import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import { equals, isNil } from 'ramda'

function internalFn<T extends Nft>(nftA: T): (nftB: T) => boolean {
  return function (nftB: T) {
    return equals(getNftIndex(nftA), getNftIndex(nftB))
  }
}

export function eqNft<T extends Nft>(nftA: T, nftB: T): boolean
export function eqNft<T extends Nft>(nftA: T): (nftB: T) => boolean
export function eqNft<T extends Nft>(nftA: T, nftB?: T): boolean | ((nftB: T) => boolean) {
  if (isNil(nftB)) {
    return internalFn(nftA)
  }
  return internalFn(nftA)(nftB)
}
