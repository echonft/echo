import type { Collection } from '@echo/model/types/collection'
import type { Nft } from '@echo/model/types/nft'
import type { Strict } from '@echo/utils/types/strict'
import { eqBy, isNil, modify, pick, pipe } from 'ramda'

type PartialNft = Pick<Nft, 'tokenId'> & Record<'collection', Pick<Collection, 'contract'>>
export function eqNftWithCollectionContract(nftA: PartialNft, nftB: PartialNft): boolean
export function eqNftWithCollectionContract(nftA: PartialNft): (nftB: PartialNft) => boolean
export function eqNftWithCollectionContract(
  nftA: PartialNft,
  nftB?: PartialNft
): boolean | ((nftB: PartialNft) => boolean) {
  const predicate = pipe<[PartialNft], PartialNft, Strict<PartialNft, PartialNft>>(
    pick(['tokenId', 'collection']),
    modify<'collection', Pick<Collection, 'contract'>, Pick<Collection, 'contract'>>('collection', pick(['contract']))
  )
  if (isNil(nftB)) {
    return eqBy(predicate, nftA)
  }
  return eqBy(predicate, nftA, nftB)
}
