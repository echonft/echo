import type { Address } from '@echo/model/types/address'
import { fetchCollection } from '@echo/nft-scan/fetchers/fetch-collection'
import { info } from '@echo/nft-scan/helpers/logger'
import type { FetchCollectionResponse } from '@echo/nft-scan/types/response/fetch-collection-response'
import { assoc, isNil } from 'ramda'

export async function getCollectionByContract(contract: Address): Promise<FetchCollectionResponse> {
  info({ collection: { contract } }, 'fetching collection from NFTScan...')
  const response = await fetchCollection({ contract })
  if (isNil(response.collection)) {
    info({ contract }, 'collection not found on NFTScan')
  } else {
    info(
      { contract, collection: assoc('isSpam', response.isSpam, response.collection) },
      'fetched collection from NFTScan'
    )
  }
  return response
}
