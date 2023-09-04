import { BadRequestError } from '../error/bad-request-error'
import { getNftsForCollection } from '@echo/firestore'
import { NftCollection } from '@echo/firestore-types'

export async function getNftCollectionNfts(collection: NftCollection) {
  try {
    return await getNftsForCollection(collection.id)
  } catch (e) {
    throw new BadRequestError()
  }
}
