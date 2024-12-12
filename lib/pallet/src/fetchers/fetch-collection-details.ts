import type { SeiAddress } from '@echo/model/types/sei-address'
import { FetchError } from '@echo/pallet/constants/errors/fetch-error'
import { fetchInit } from '@echo/pallet/helpers/fetch-init'
import { error } from '@echo/pallet/helpers/logger'
import type { FetchCollectionDetailsResponse } from '@echo/pallet/types/response/fetch-collection-details-response'
import { fetchCollectionDetailsResponseSchema } from '@echo/pallet/validators/fetch-collection-details-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'

export async function fetchCollectionDetails(seiAddress: SeiAddress): Promise<FetchCollectionDetailsResponse> {
  // FIXME
  // const url = palletApiRoutes.collections.fetchDetails.getUrl({ seiAddress })
  const url = `https://api.pallet.exchange/api/v2/nfts/${seiAddress}/details`
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
