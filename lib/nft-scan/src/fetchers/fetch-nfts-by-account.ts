import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import type { GetNftsByAccountQueryParams } from '@echo/nft-scan/types/query-params/get-nfts-by-account-query-params'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import { getNftsByAccountResponseSchema } from '@echo/nft-scan/validators/get-nfts-by-account-response-schema'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { stringify } from 'qs'
import { always, applySpec, defaultTo, partialRight, pipe, prop } from 'ramda'

export async function fetchNftsByAccount(
  args: GetNftsByAccountRequest
): Promise<Promise<ReturnType<typeof getNftsByAccountResponseSchema.parse>>> {
  const { fetch, wallet } = args
  const query = pipe(
    applySpec<GetNftsByAccountQueryParams>({
      erc_type: always('erc721'),
      cursor: prop('next'),
      limit: prop('limit'),
      show_attribute: pipe(prop('showAttribute'), defaultTo(true))
    }),
    partialRight(stringify, [{ addQueryPrefix: true }])
  )(args)
  const url = `${getBaseUrl(wallet.chain)}/account/own/${wallet.address}${query}`
  const init = await fetchInit()
  const response = await fetch(url, init)
  if (!response.ok) {
    throw Error(
      `error fetching NFTs for ${wallet.address}: ${JSON.stringify({ url, status: response.statusText }, undefined, 2)}`
    )
  }
  return parseResponse(getNftsByAccountResponseSchema)(response)
}
