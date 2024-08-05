import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { nftScanApiPathProvider } from '@echo/nft-scan/services/routing/nft-scan-api-path-provider'
import type { FetchNftsByContractRequest } from '@echo/nft-scan/types/request/fetch-nfts-by-contract-request'
import {
  type FetchNftsByAccountResponseSchemaReturn,
  fetchNftsResponseSchema
} from '@echo/nft-scan/validators/fetch-nfts-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { omit, pick } from 'ramda'

export async function fetchNftsByContract(
  args: WithLoggerType<FetchNftsByContractRequest>
): Promise<Promise<FetchNftsByAccountResponseSchemaReturn>> {
  const { fetch, contract, logger } = args
  const url = nftScanApiPathProvider.nfts.fetchByAccount.getUrl(contract, omit(['contract'], args))
  const init = await fetchInit(logger)
  const response = await fetch(url, init)
  if (!response.ok) {
    logger?.error(
      {
        contract,
        url,
        response: pick(['status'], response)
      },
      'error fetching NFTs by contract'
    )
    return Promise.reject(Error('error fetching NFTs by contract'))
  }
  return parseResponse(fetchNftsResponseSchema(contract.chain))(response)
}
