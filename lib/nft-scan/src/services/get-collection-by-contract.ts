import type { Address } from '@echo/model/types/address'
import { fetchCollection } from '@echo/nft-scan/fetchers/fetch-collection'
import type { FetchCollectionResponse } from '@echo/nft-scan/types/response/fetch-collection-response'

export function getCollectionByContract(contract: Address): Promise<FetchCollectionResponse> {
  return fetchCollection({ contract })
}
