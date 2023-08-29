import { getNftCollectionNftsRequestSchema } from '../../validators/get-nft-collection-nfts-request-schema'
import { BadRequestError } from '../error/bad-request-error'
import { NftCollectionRequest } from '@echo/api-public'
import { head } from 'ramda'

export function parseGetNftCollectionNftsRequest(query: NftCollectionRequest) {
  try {
    const { slug } = getNftCollectionNftsRequestSchema.parse(query)
    return head(slug) as string
  } catch (e) {
    throw new BadRequestError()
  }
}
