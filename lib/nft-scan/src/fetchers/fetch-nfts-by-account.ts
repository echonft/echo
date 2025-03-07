import { FetchError } from '@echo/nft-scan/constants/errors/fetch-error'
import { nftScanApiRoutes } from '@echo/nft-scan/constants/nft-scan-api-routes'
import { fetchInit } from '@echo/nft-scan/helpers/fetch-init'
import { error } from '@echo/nft-scan/helpers/logger'
import type { FetchNftsByAccountRequest } from '@echo/nft-scan/types/request/fetch-nfts-by-account-request'
import type { FetchNftsResponse } from '@echo/nft-scan/types/response/fetch-nfts-response'
import { fetchNftsResponseSchema } from '@echo/nft-scan/validators/fetch-nfts-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { pick } from 'ramda'

export async function fetchNftsByAccount({
  account,
  showAttribute,
  limit,
  next
}: FetchNftsByAccountRequest): Promise<FetchNftsResponse> {
  const url = nftScanApiRoutes.nfts.fetchByAccount
    .withQuery({ showAttribute, limit, next })
    .getUrl({ address: account })
  const init = await fetchInit()
  const response = await fetch(url, init)
  if (!response.ok) {
    error(
      {
        account: account,
        url,
        response: pick(['status'], response)
      },
      FetchError.Nfts
    )
    return Promise.reject(Error(FetchError.Nfts))
  }
  return parseResponse(fetchNftsResponseSchema)(response)
}
