import { nftCollectionRequestSchema } from '../../validators/nft-collection-request-schema'
import { BadRequestError } from '../error/bad-request-error'
import { NftCollectionRequest } from '@echo/api-public'

export function parseNftCollectionRequest(query: NftCollectionRequest) {
  try {
    return nftCollectionRequestSchema.parse(query)
  } catch (e) {
    throw new BadRequestError()
  }
}
