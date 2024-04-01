import { ForbiddenError } from '@echo/frontend/lib/helpers/error/forbidden-error'
import { type Nft } from '@echo/model/types/nft'
import { isNil } from 'ramda'

export function assertNftOwner(nft: Nft, username: string) {
  if (isNil(nft.owner) || nft.owner.username !== username) {
    throw new ForbiddenError(`user with username ${username} is not the owner of NFT with id ${nft.id}`)
  }
}
