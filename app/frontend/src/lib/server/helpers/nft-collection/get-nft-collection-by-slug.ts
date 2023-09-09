import { ServerError } from '../error/server-error'
import { findNftCollectionBySlug } from '@echo/firestore'

export async function getNftCollectionBySlug(slug: string) {
  try {
    return await findNftCollectionBySlug(slug)
  } catch (e) {
    throw new ServerError(`error getting collection with slug ${slug}`, e)
  }
}
