import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@server/helpers/error/server-error'

export async function getNftsForUser(username: string, constraints?: QueryConstraints) {
  try {
    return await getNftsForOwner(username, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting nfts for user with username ${username} with constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
