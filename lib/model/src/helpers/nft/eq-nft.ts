import { nftIndex } from '@echo/model/helpers/nft/nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import { eqBy, isNil } from 'ramda'

function innerEqNft<T extends NftIndex>(nftA: T): (nftB: T) => boolean {
  return function (nftB: T) {
    return eqBy(nftIndex, nftA, nftB)
  }
}

export function eqNft<T extends NftIndex>(nftA: T, nftB: T): boolean
export function eqNft<T extends NftIndex>(nftA: T): (nftB: T) => boolean
export function eqNft<T extends NftIndex>(nftA: T, nftB?: T): boolean | ((nftB: T) => boolean) {
  if (isNil(nftB)) {
    return innerEqNft(nftA)
  }
  return innerEqNft(nftA)(nftB)
}
