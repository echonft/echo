import { FetchError } from '@echo/nft-scan/constants/errors/fetch-error'
import { fetchInit } from '@echo/nft-scan/helpers/fetch-init'
import { error } from '@echo/nft-scan/helpers/logger'
import { nftScanApiPathProvider } from '@echo/nft-scan/services/routing/nft-scan-api-path-provider'
import type { FetchNftsByContractRequest } from '@echo/nft-scan/types/request/fetch-nfts-by-contract-request'
import type { FetchNftsResponse } from '@echo/nft-scan/types/response/fetch-nfts-response'
import { fetchNftsResponseSchema } from '@echo/nft-scan/validators/fetch-nfts-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { pick } from 'ramda'

export async function fetchNftsByContract({
  contract,
  showAttribute,
  next,
  limit
}: FetchNftsByContractRequest): Promise<Promise<FetchNftsResponse>> {
  const url = nftScanApiPathProvider.nfts.fetchByAccount.getUrl(contract, { showAttribute, next, limit })
  const init = await fetchInit()
  const response = await fetch(url, init)
  if (!response.ok) {
    error(
      {
        contract,
        url,
        response: pick(['status'], response)
      },
      FetchError.Nfts
    )
    return Promise.reject(Error(FetchError.Nfts))
  }
  return parseResponse(fetchNftsResponseSchema(contract.chain))(response)
}
