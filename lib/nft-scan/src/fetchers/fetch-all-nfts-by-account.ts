import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import type { GetNftsByAccountQueryParams } from '@echo/nft-scan/types/query-params/get-nfts-by-account-query-params'
import type { GetAllNftsByAccountRequest } from '@echo/nft-scan/types/request/get-all-nfts-by-account-request'
import { getAllNftsByAccountDataResponseSchema } from '@echo/nft-scan/validators/get-all-nfts-by-account-data-response-schema'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { stringify } from 'qs'
import { always, applySpec, defaultTo, partialRight, pipe, prop } from 'ramda'

export async function fetchAllNftsByAccount(
  args: GetAllNftsByAccountRequest
): Promise<ReturnType<typeof getAllNftsByAccountDataResponseSchema.parse>> {
  const { fetch, wallet } = args
  const query = pipe(
    applySpec<GetNftsByAccountQueryParams>({
      erc_type: always('erc721'),
      show_attribute: pipe(prop('showAttribute'), defaultTo(true))
    }),
    partialRight(stringify, [{ addQueryPrefix: true }])
  )(args)
  const url = `${getBaseUrl(wallet.chain)}/account/own/all/${wallet.address}${query}`
  const response = await fetch(url, fetchInit)
  if (!response.ok) {
    throw Error(`error fetching NFTs for ${wallet.address}: {url: ${url}\nstatus:${response.statusText}}`)
  }
  return parseResponse(getAllNftsByAccountDataResponseSchema)(response)
}
