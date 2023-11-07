import { getNftsForOwner } from '@echo/firestore/crud/nft/get-nfts-for-owner'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import type { Nft } from '@echo/model/types/nft'

export async function guarded_getNftsForOwner(username: string, constraints?: QueryConstraints<Nft>) {
  try {
    return await getNftsForOwner(username, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting nfts for user with username ${username} with constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
