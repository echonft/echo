import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import type { GetNftsByAccountQueryParams } from '@echo/nft-scan/types/query-params/get-nfts-by-account-query-params'
import type { GetAllNftsByAccountRequest } from '@echo/nft-scan/types/request/get-all-nfts-by-account-request'
import { getAllNftsByAccountResponseSchema } from '@echo/nft-scan/validators/get-all-nfts-by-account-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { stringify } from 'qs'
import { always, applySpec, defaultTo, partialRight, pick, pipe, prop } from 'ramda'

export async function fetchAllNftsByAccount(
  args: WithLoggerType<GetAllNftsByAccountRequest>
): Promise<ReturnType<typeof getAllNftsByAccountResponseSchema.parse>> {
  const { fetch, wallet, logger } = args
  const query = pipe(
    applySpec<GetNftsByAccountQueryParams>({
      erc_type: always('erc721'),
      show_attribute: pipe(prop('showAttribute'), defaultTo(true))
    }),
    partialRight(stringify, [{ addQueryPrefix: true }])
  )(args)
  const url = `${getBaseUrl(wallet.chain)}/account/own/all/${wallet.address}${query}`
  const init = await fetchInit(logger)
  const response = await fetch(url, init)
  if (!response.ok) {
    logger?.error(
      { fn: 'fetchAllNftsByAccount', wallet, url, response: pick(['status'], response) },
      'error fetching NFTs'
    )
    return Promise.reject(Error(`error fetching all NFTs for ${wallet.address}`))
  }
  return parseResponse(getAllNftsByAccountResponseSchema)(response)
}
