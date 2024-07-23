import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { nftScanApiPathProvider } from '@echo/nft-scan/services/routing/nft-scan-api-path-provider'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import {
  getNftsByAccountResponseSchema,
  type GetNftsByAccountResponseSchemaReturn
} from '@echo/nft-scan/validators/get-nfts-by-account-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { omit, pick } from 'ramda'

export async function fetchNftsByAccount(
  args: WithLoggerType<GetNftsByAccountRequest>
): Promise<Promise<GetNftsByAccountResponseSchemaReturn>> {
  const { fetch, wallet, logger } = args
  const url = nftScanApiPathProvider.nfts.fetch.getUrl(wallet, omit(['wallet'], args))
  const init = await fetchInit(logger)
  const response = await fetch(url, init)
  if (!response.ok) {
    logger?.error(
      {
        wallet,
        url,
        response: pick(['status'], response)
      },
      'error fetching NFTs'
    )
    return Promise.reject(Error('error fetching NFTs'))
  }
  return parseResponse(getNftsByAccountResponseSchema(wallet.chain))(response)
}
