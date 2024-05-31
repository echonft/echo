import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import { parseFetchResponse } from '@echo/nft-scan/helpers/parse-fetch-response'
import { mapGetNftsRequestToQueryStringParams } from '@echo/nft-scan/mappers/map-get-nfts-request-to-query-string-params'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import type { GetNftsByAccountResponse } from '@echo/nft-scan/types/response/get-nfts-by-account-response'
import { stringify } from 'qs'
import { pipe, prop } from 'ramda'

export async function fetchNft(args: GetNftsByAccountRequest): Promise<GetNftsByAccountResponse> {
  const { fetch, chain, accountAddress } = args
  const url = `${getBaseUrl(chain)}/account/own/${accountAddress}${stringify(mapGetNftsRequestToQueryStringParams(args), { addQueryPrefix: true })}`
  const response = await fetch(url, fetchInit)
  if (!response.ok) {
    throw Error(`error fetching NFTs for ${accountAddress}: {url: ${url}\nstatus:${response.statusText}}`)
  }
  return pipe(prop('data'), parseFetchResponse<GetNftsByAccountResponse>)(response)
}
