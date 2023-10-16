import { findCollectionBySlug } from '@echo/firestore/crud/collection/find-collection-by-slug'
import { ServerError } from '@server/helpers/error/server-error'

export async function getCollectionBySlug(slug: string) {
  try {
    return await findCollectionBySlug(slug)
  } catch (e) {
    throw new ServerError(`error getting collection with slug ${slug}`, e)
  }
}
