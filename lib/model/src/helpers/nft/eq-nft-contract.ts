import type { NftWithContract } from '@echo/model/types/nft'
import { applySpec, eqBy, isNil, path, prop } from 'ramda'

export function eqNftContract<T extends NftWithContract>(nftA: T, nftB: T): boolean
export function eqNftContract<T extends NftWithContract>(nftA: T): (nftB: T) => boolean
export function eqNftContract<T extends NftWithContract>(nftA: T, nftB?: T): boolean | ((nftB: T) => boolean) {
  const predicate = applySpec<NftWithContract>({
    contract: path(['collection', 'contract']),
    tokenId: prop('tokenId')
  })
  if (isNil(nftB)) {
    return eqBy<T>(predicate, nftA)
  }
  return eqBy<T>(predicate, nftA, nftB)
}
