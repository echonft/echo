import { getNftIndex } from '@echo/model/helpers/nft/get-nft-index'
import type { PartialNft } from '@echo/model/types/nft'
import { equals, isNil } from 'ramda'

function internalFn(nftA: PartialNft): (nftB: PartialNft) => boolean {
  return function (nftB: PartialNft) {
    return equals(getNftIndex(nftA), getNftIndex(nftB))
  }
}

export function eqNft(nftA: PartialNft, nftB: PartialNft): boolean
export function eqNft(nftA: PartialNft): (nftB: PartialNft) => boolean
export function eqNft(nftA: PartialNft, nftB?: PartialNft): boolean | ((nftB: PartialNft) => boolean) {
  if (isNil(nftB)) {
    return internalFn(nftA)
  }
  return internalFn(nftA)(nftB)
}
