import { findNftCollectionBySlug } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-slug'
import { ServerError } from '@server/helpers/error/server-error'

export async function getCollectionBySlug(slug: string) {
  try {
    return await findNftCollectionBySlug(slug)
  } catch (e) {
    throw new ServerError(`error getting collection with slug ${slug}`, e)
  }
}
