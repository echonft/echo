import { fetchInit } from '@echo/nft-scan/helpers/fetch-init'
import { nftScanApiPathProvider } from '@echo/nft-scan/services/routing/nft-scan-api-path-provider'
import type { FetchNftsByAccountRequest } from '@echo/nft-scan/types/request/fetch-nfts-by-account-request'
import {
  type FetchNftsByAccountResponseSchemaReturn,
  fetchNftsResponseSchema
} from '@echo/nft-scan/validators/fetch-nfts-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { omit, pick } from 'ramda'

export async function fetchNftsByAccount(
  args: WithLoggerType<FetchNftsByAccountRequest>
): Promise<Promise<FetchNftsByAccountResponseSchemaReturn>> {
  const { fetch, wallet, logger } = args
  const url = nftScanApiPathProvider.nfts.fetchByAccount.getUrl(wallet, omit(['wallet'], args))
  const init = await fetchInit(logger)
  const response = await fetch(url, init)
  if (!response.ok) {
    logger?.error(
      {
        wallet,
        url,
        response: pick(['status'], response)
      },
      'error fetching NFTs by account'
    )
    return Promise.reject(Error('error fetching NFTs by account'))
  }
  return parseResponse(fetchNftsResponseSchema(wallet.chain))(response)
}
