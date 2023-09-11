import { getNftsForCollection } from '@echo/firestore'
import type { QueryConstraints } from '@echo/firestore-types'
import { ServerError } from '@server/helpers/error/server-error'

export async function getNftCollectionNfts(collectionSlug: string, constraints?: QueryConstraints) {
  try {
    return await getNftsForCollection(collectionSlug, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting nfts for collection with slug ${collectionSlug} with constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
