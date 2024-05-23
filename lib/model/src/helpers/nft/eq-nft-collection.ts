import { eqCollection } from '@echo/model/helpers/collection/eq-collection'
import type { Nft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

function internalFn<T extends Nft>(nftA: T): (nftB: T) => boolean {
  return function (nftB: T) {
    return eqCollection(nftA.collection, nftB.collection)
  }
}

export function eqNftCollection<T extends Nft>(nftA: T, nftB: T): boolean
export function eqNftCollection<T extends Nft>(nftA: T): (nftB: T) => boolean
export function eqNftCollection<T extends Nft>(nftA: T, nftB?: T): boolean | ((nftB: T) => boolean) {
  if (isNil(nftB)) {
    return internalFn(nftA)
  }
  return internalFn(nftA)(nftB)
}
