import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import { parseFetchResponse } from '@echo/nft-scan/helpers/parse-fetch-response'
import type { GetNftsByAccountQueryParams } from '@echo/nft-scan/types/query-params/get-nfts-by-account-query-params'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import type { BaseResponse } from '@echo/nft-scan/types/response/base-response'
import type { GetNftsByAccountResponse } from '@echo/nft-scan/types/response/get-nfts-by-account-response'
import { stringify } from 'qs'
import { always, andThen, applySpec, defaultTo, partialRight, pipe, prop } from 'ramda'

export async function fetchNftsByAccount(args: GetNftsByAccountRequest): Promise<GetNftsByAccountResponse> {
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
  const response = await fetch(url, fetchInit)
  if (!response.ok) {
    throw Error(`error fetching NFTs for ${wallet.address}: {url: ${url}\nstatus:${response.statusText}}`)
  }
  return pipe(parseFetchResponse<BaseResponse<GetNftsByAccountResponse>>, andThen(prop('data')))(response)
}
