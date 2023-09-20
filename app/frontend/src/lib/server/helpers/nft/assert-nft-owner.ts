import { FirestoreNft } from '@echo/firestore/types/model/firestore-nft'
import { FirestoreUserDetails } from '@echo/firestore/types/model/firestore-user-details'
import { ForbiddenError } from '@server/helpers/error/forbidden-error'
import { isNil } from 'ramda'

export function assertNftOwner(
  nft: Partial<FirestoreNft>,
  username: string
): asserts nft is Partial<FirestoreNft> & { owner: Partial<FirestoreUserDetails> & { username: string } } {
  if (isNil(nft.owner) || nft.owner.username !== username) {
    throw new ForbiddenError(`user with username ${username} is not the owner of NFT with id ${nft.id}`)
  }
}
