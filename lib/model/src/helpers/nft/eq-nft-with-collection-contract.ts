import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import { eqProps, equals, isNil } from 'ramda'

type PartialNft = Pick<Nft, 'tokenId'> & Record<'collection', Pick<Collection, 'contract'>>
function internalFn(nftA: PartialNft): (nftB: PartialNft) => boolean {
  return function (nftB: PartialNft) {
    return eqProps('tokenId', nftA, nftB) && equals(nftA.collection.contract, nftB.collection.contract)
  }
}

export function eqNftWithCollectionContract(nftA: PartialNft, nftB: PartialNft): boolean
export function eqNftWithCollectionContract(nftA: PartialNft): (nftB: PartialNft) => boolean
export function eqNftWithCollectionContract(
  nftA: PartialNft,
  nftB?: PartialNft
): boolean | ((nftB: PartialNft) => boolean) {
  if (isNil(nftB)) {
    return internalFn(nftA)
  }
  return internalFn(nftA)(nftB)
}
