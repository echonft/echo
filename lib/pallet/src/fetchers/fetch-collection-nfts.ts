import { FetchError } from '@echo/pallet/constants/errors/fetch-error'
import { palletApiRoutes } from '@echo/pallet/constants/pallet-api-routes'
import { fetchInit } from '@echo/pallet/helpers/fetch-init'
import { error } from '@echo/pallet/helpers/logger'
import {
  DEFAULT_PAGE_SIZE,
  type FetchCollectionNftsRequest
} from '@echo/pallet/types/request/fetch-collection-nfts-request'
import type { FetchNftsByCollectionResponse } from '@echo/pallet/types/response/fetch-nfts-by-collection-response'
import { fetchNftsByCollectionResponseSchema } from '@echo/pallet/validators/fetch-nfts-by-collection-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { backOff } from 'exponential-backoff'

export async function fetchCollectionNfts({
  seiAddress,
  page,
  pageSize = DEFAULT_PAGE_SIZE
}: FetchCollectionNftsRequest): Promise<FetchNftsByCollectionResponse> {
  const url = palletApiRoutes.nfts.fetchByCollection.withQuery({ page, pageSize }).getUrl({ seiAddress })
  const init = fetchInit()

  const response = await backOff(() => fetch(url, init), {
    numOfAttempts: 10,
    startingDelay: 1100,
    retry: (e: Error, attemptNumber: number) => {
      error(
        {
          seiAddress,
          url,
          error: e,
          attemptNumber
        },
        'Retrying collection NFTs fetch'
      )
      return true
    }
  })

  if (!response.ok) {
    error(
      {
        seiAddress,
        url,
        response
      },
      FetchError.Nfts
    )
    return Promise.reject(Error(FetchError.Nfts))
  }

  return parseResponse(fetchNftsByCollectionResponseSchema)(response)
}
