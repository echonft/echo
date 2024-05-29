import { eqCollection } from '@echo/model/helpers/collection/eq-collection'
import type { Nft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

function internalFn(nftA: Nft): (nftB: Nft) => boolean {
  return function (nftB: Nft) {
    return eqCollection(nftA.collection, nftB.collection)
  }
}

export function eqNftCollection(nftA: Nft, nftB: Nft): boolean
export function eqNftCollection(nftA: Nft): (nftB: Nft) => boolean
export function eqNftCollection(nftA: Nft, nftB?: Nft): boolean | ((nftB: Nft) => boolean) {
  if (isNil(nftB)) {
    return internalFn(nftA)
  }
  return internalFn(nftA)(nftB)
}
