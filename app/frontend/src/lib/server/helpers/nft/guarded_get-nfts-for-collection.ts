import { getNftsForCollection } from '@echo/firestore/crud/nft/get-nfts-for-collection'
import { type QueryConstraints } from '@echo/firestore/types/query/query-constraints'
import { ServerError } from '@echo/frontend/lib/server/helpers/error/server-error'
import type { Nft } from '@echo/model/types/nft'

export async function guarded_getNftsForCollection(collectionSlug: string, constraints?: QueryConstraints<Nft>) {
  try {
    return await getNftsForCollection(collectionSlug, constraints)
  } catch (e) {
    throw new ServerError(
      `error getting nfts for collection with slug ${collectionSlug} with constraints ${JSON.stringify(constraints)}`,
      e
    )
  }
}
