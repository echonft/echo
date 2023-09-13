import { findNftByCollection } from '@echo/firestore/crud/nft/find-nft-by-collection'
import { ServerError } from '@server/helpers/error/server-error'

export async function getNftByCollection(collectionSlug: string, tokenId: number) {
  try {
    return await findNftByCollection(collectionSlug, tokenId)
  } catch (e) {
    throw new ServerError(`error finding nft with tokenId ${tokenId} for collection with slug ${collectionSlug}`, e)
  }
}
