import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { Nft } from '@echo/model/types/nft'
import { equals, isNil } from 'ramda'

function internalFn(nftA: Nft): (nftB: Nft) => boolean {
  return function (nftB: Nft) {
    return equals(getNftIndex(nftA), getNftIndex(nftB))
  }
}

export function eqNft(nftA: Nft, nftB: Nft): boolean
export function eqNft(nftA: Nft): (nftB: Nft) => boolean
export function eqNft(nftA: Nft, nftB?: Nft): boolean | ((nftB: Nft) => boolean) {
  if (isNil(nftB)) {
    return internalFn(nftA)
  }
  return internalFn(nftA)(nftB)
}
