import { ServerError } from '../error/server-error'
import { getNftsForCollection } from '@echo/firestore'
import { QueryConstraints } from '@echo/firestore-types'

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
