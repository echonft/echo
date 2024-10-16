import type { OwnedNft } from '@echo/model/types/nft/owned-nft'
import type { User } from '@echo/model/types/user/user'
import { head, type NonEmptyArray, pipe, prop } from 'ramda'

/**
 * Returns the owner of a list of NFTs
 * We assume that the check for ownership equality has been done already
 * @param nfts
 */
export function getNftsOwner(nfts: NonEmptyArray<OwnedNft>): User {
  return pipe<[NonEmptyArray<OwnedNft>], OwnedNft, User>(head, prop('owner'))(nfts)
}
