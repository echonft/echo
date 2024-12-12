import type { SeiAddress } from '@echo/model/types/sei-address'
import { FetchError } from '@echo/pallet/constants/errors/fetch-error'
import { palletApiRoutes } from '@echo/pallet/constants/pallet-api-routes'
import { fetchInit } from '@echo/pallet/helpers/fetch-init'
import { error } from '@echo/pallet/helpers/logger'
import type { FetchCollectionDetailsResponse } from '@echo/pallet/types/response/fetch-collection-details-response'
import { fetchCollectionDetailsResponseSchema } from '@echo/pallet/validators/fetch-collection-details-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'

export async function fetchCollectionDetails(seiAddress: SeiAddress): Promise<FetchCollectionDetailsResponse> {
  const url = palletApiRoutes.collections.fetchDetails.getUrl({ seiAddress })
  const init = fetchInit()
  const response = await fetch(url, init)
  if (!response.ok) {
    error(
      {
        seiAddress,
        url,
        response
      },
      FetchError.Collection
    )
    return Promise.reject(Error(FetchError.Collection))
  }
  return parseResponse(fetchCollectionDetailsResponseSchema)(response)
}
