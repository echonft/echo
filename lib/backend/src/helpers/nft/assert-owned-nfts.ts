import { NftError } from '@echo/model/constants/errors/nft-error'
import { isOwnedNft } from '@echo/model/helpers/nft/is-owned-nft'
import type { Nft } from '@echo/model/types/nft/nft'
import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import { any, complement } from 'ramda'

/**
 * @param nfts
 * @throws Error if one or more NFTs do not have an owner
 */
export function assertNftsOwner(nfts: Nft[]): asserts nfts is OwnedNft[] {
  if (any(complement(isOwnedNft), nfts)) {
    throw Error(NftError.Ownership)
  }
}
