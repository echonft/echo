import { ServerError } from '../error/server-error'
import { getNftsForOwner } from '@echo/firestore'
import { QueryConstraints } from '@echo/firestore-types'

export async function getNftsForUser(userId: string, constraints?: QueryConstraints) {
  try {
    return await getNftsForOwner(userId, constraints)
  } catch (e) {
    throw new ServerError()
  }
}
