import { getBaseUrl } from '@echo/opensea/helpers/get-base-url'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import type { GetNftsByAccountRequest } from '@echo/opensea/types/request/get-nfts-by-account-request'
import type { GetNftsByAccountResponse } from '@echo/opensea/types/response/get-nfts-by-account-response'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { stringify } from 'qs'
import { applySpec, concat, defaultTo, pick, pipe, prop } from 'ramda'

export async function fetchNftsByAccount(
  args: WithLoggerType<GetNftsByAccountRequest>
): Promise<GetNftsByAccountResponse> {
  const { wallet, fetch, logger } = args
  const query = applySpec<Pick<GetNftsByAccountRequest, 'next'> & Record<'limit', number>>({
    next: prop('next'),
    limit: pipe(prop('limit'), defaultTo(200))
  })(args)
  const url = concat(
    `${getBaseUrl(wallet.chain)}/chain/${wallet.chain}/account/${wallet.address}/nfts`,
    stringify(query, { addQueryPrefix: true, skipNulls: true })
  )
  const response = await throttleFetch({ fetch, url, logger })
  if (!response.ok) {
    logger?.error(
      { fn: 'fetchNftsByAccount', wallet, url, response: pick(['status'], response) },
      'error fetching NFTs'
    )
    return Promise.reject(Error(`error fetching NFTs for wallet ${JSON.stringify(wallet)}`))
  }
  return parseFetchResponse<GetNftsByAccountResponse>(response)
}
