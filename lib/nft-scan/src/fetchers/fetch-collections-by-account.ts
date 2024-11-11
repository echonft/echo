import { FetchError } from '@echo/nft-scan/constants/errors/fetch-error'
import { nftScanApiRoutes } from '@echo/nft-scan/constants/nft-scan-api-routes'
import { fetchInit } from '@echo/nft-scan/helpers/fetch-init'
import { error } from '@echo/nft-scan/helpers/logger'
import type { FetchCollectionsByAccountRequest } from '@echo/nft-scan/types/request/fetch-collections-by-account-request'
import type { FetchCollectionsResponse } from '@echo/nft-scan/types/response/fetch-collections-response'
import { fetchCollectionsResponseSchema } from '@echo/nft-scan/validators/fetch-collections-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { pick } from 'ramda'

export async function fetchCollectionsByAccount({
  account,
  limit,
  next
}: FetchCollectionsByAccountRequest): Promise<FetchCollectionsResponse> {
  const url = nftScanApiRoutes.collections.fetchByAccount.withQuery({ limit, next }).getUrl({ address: account })
  const init = await fetchInit()
  const response = await fetch(url, init)
  if (!response.ok) {
    error(
      {
        account: account,
        url,
        response: pick(['status'], response)
      },
      FetchError.Collections
    )
    return Promise.reject(Error(FetchError.Collections))
  }
  return parseResponse(fetchCollectionsResponseSchema)(response)
}
