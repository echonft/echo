import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import type { GetNftsByAccountQueryParams } from '@echo/nft-scan/types/query-params/get-nfts-by-account-query-params'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import { getNftsByAccountResponseSchema } from '@echo/nft-scan/validators/get-nfts-by-account-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { stringify } from 'qs'
import { always, applySpec, defaultTo, filter, modifyPath, partialRight, pick, pipe, prop, propEq } from 'ramda'

export async function fetchNftsByAccount(
  args: WithLoggerType<GetNftsByAccountRequest>
): Promise<Promise<ReturnType<typeof getNftsByAccountResponseSchema.parse>>> {
  const { fetch, wallet, logger } = args
  const query = pipe(
    applySpec<GetNftsByAccountQueryParams>({
      erc_type: always('erc721'),
      cursor: prop('next'),
      limit: pipe(prop('limit'), defaultTo(100)),
      show_attribute: pipe(prop('showAttribute'), defaultTo(true))
    }),
    partialRight(stringify, [{ addQueryPrefix: true }])
  )(args)
  const url = `${getBaseUrl(wallet.chain)}/account/own/${wallet.address}${query}`
  const init = await fetchInit(logger)
  const response = await fetch(url, init)
  if (!response.ok) {
    logger?.error(
      {
        fn: fetchNftsByAccount.name,
        wallet,
        url,
        response: pick(['status'], response)
      },
      'error fetching NFTs'
    )
    return Promise.reject(Error(`error fetching NFTs for ${JSON.stringify(wallet)}`))
  }
  const parsedResponse = await parseResponse(getNftsByAccountResponseSchema)(response)
  return modifyPath<Promise<Promise<ReturnType<typeof getNftsByAccountResponseSchema.parse>>>>(
    ['data', 'content'],
    filter(propEq('erc721', 'erc_type')),
    parsedResponse
  )
}
