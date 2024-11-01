import { assertNftsOwner } from '@echo/backend/helpers/nft/assert-owned-nfts'
import { NftError } from '@echo/model/constants/errors/nft-error'
import { eqUser } from '@echo/model/helpers/user/eq-user'
import type { Nft, OwnedNft } from '@echo/model/types/nft'
import type { User } from '@echo/model/types/user'
import { listElementsEqWith } from '@echo/utils/helpers/list-elements-eq-with'
import { complement, map, pipe, prop } from 'ramda'

/**
 * @param nfts
 * @throws Error if the NFTs do not all have the same owner
 */
export function assertNftsEqOwner(nfts: Nft[]): OwnedNft[] {
  assertNftsOwner(nfts)
  if (complement(pipe<[OwnedNft[]], User[], boolean>(map(prop('owner')), listElementsEqWith(eqUser)))(nfts)) {
    throw Error(NftError.Ownership)
  }
  return nfts
}
