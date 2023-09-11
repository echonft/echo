import { getNftsForOwner } from '@echo/firestore'
import type { QueryConstraints } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'

export async function getNftsForUser(userId: string, constraints?: QueryConstraints) {
  try {
    return await getNftsForOwner(userId, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting nfts for user with id ${userId} with constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
