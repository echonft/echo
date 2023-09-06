import { ServerError } from '../error/server-error'
import { findNftByCollection } from '@echo/firestore/src/crud/nft/find-nft-by-collection'

export async function getNftByCollection(collectionSlug: string, tokenId: number) {
  try {
    return await findNftByCollection(collectionSlug, tokenId)
  } catch (e) {
    throw new ServerError()
  }
}
