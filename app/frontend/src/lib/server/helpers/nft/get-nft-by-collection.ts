import { ServerError } from '../error/server-error'
import { findNftByCollection } from '@echo/firestore'

export async function getNftByCollection(collectionSlug: string, tokenId: number) {
  try {
    return await findNftByCollection(collectionSlug, tokenId)
  } catch (e) {
    throw new ServerError(`error finding nft with tokenId ${tokenId} for collection with slug ${collectionSlug}`, e)
  }
}
