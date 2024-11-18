import { assertOwnedNfts } from '@echo/backend/helpers/nft/assert-owned-nfts'
import { NftError } from '@echo/model/constants/errors/nft-error'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import { complement, equals, filter, length, map, path, pipe } from 'ramda'

/**
 * @param username
 * @throws Error if the NFTs do not all have the same owner specified by username
 */
export function assertNftsEqOwner(username: string) {
  return function (nfts: Nft[]): OwnedNft[] {
    assertOwnedNfts(nfts)
    if (
      pipe(
        map<OwnedNft, string>(path(['owner', 'username'])),
        filter(equals(username)),
        length,
        complement(equals(nfts.length))
      )(nfts)
    ) {
      throw Error(NftError.Ownership)
    }
    return nfts
  }
}
