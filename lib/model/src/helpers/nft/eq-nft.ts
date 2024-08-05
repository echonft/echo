import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { NftIndex } from '@echo/model/types/nft'
import { eqBy, isNil } from 'ramda'

function internalFn(nftA: NftIndex): (nftB: NftIndex) => boolean {
  return function (nftB: NftIndex) {
    return eqBy(getNftIndex, nftA, nftB)
  }
}

export function eqNft(nftA: NftIndex, nftB: NftIndex): boolean
export function eqNft(nftA: NftIndex): (nftB: NftIndex) => boolean
export function eqNft(nftA: NftIndex, nftB?: NftIndex): boolean | ((nftB: NftIndex) => boolean) {
  if (isNil(nftB)) {
    return internalFn(nftA)
  }
  return internalFn(nftA)(nftB)
}
