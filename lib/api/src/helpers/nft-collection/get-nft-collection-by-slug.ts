import { ServerError } from '../error/server-error'
import { findNftCollectionBySlug } from '@echo/firestore'

export async function getNftCollectionBySlug(slug: string) {
  try {
    return await findNftCollectionBySlug(slug)
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    throw new ServerError(e.message)
  }
}
