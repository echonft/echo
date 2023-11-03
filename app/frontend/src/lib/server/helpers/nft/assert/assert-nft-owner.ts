import { ForbiddenError } from '@echo/frontend/lib/server/helpers/error/forbidden-error'
import { type Nft } from '@echo/model/types/nft'
import { type User } from '@echo/model/types/user'
import { isNil } from 'ramda'

export function assertNftOwner(
  nft: Nft,
  username: string
): asserts nft is Omit<Nft, 'owner'> & Record<'owner', Omit<User, 'username'> & Record<'username', string>> {
  if (isNil(nft.owner) || nft.owner.username !== username) {
    throw new ForbiddenError(`user with username ${username} is not the owner of NFT with id ${nft.id}`)
  }
}
