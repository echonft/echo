import type { CollectionContract } from '@echo/model/types/collection'
import type { NftWithContract } from '@echo/model/types/nft'
import { eqBy, isNil, modify, pick, pipe } from 'ramda'

export function eqNftContract(nftA: NftWithContract, nftB: NftWithContract): boolean
export function eqNftContract(nftA: NftWithContract): (nftB: NftWithContract) => boolean
export function eqNftContract(
  nftA: NftWithContract,
  nftB?: NftWithContract
): boolean | ((nftB: NftWithContract) => boolean) {
  const predicate = pipe<[NftWithContract], NftWithContract, NftWithContract>(
    pick(['tokenId', 'collection']),
    modify<'collection', CollectionContract, CollectionContract>('collection', pick(['contract']))
  )
  if (isNil(nftB)) {
    return eqBy(predicate, nftA)
  }
  return eqBy(predicate, nftA, nftB)
}
