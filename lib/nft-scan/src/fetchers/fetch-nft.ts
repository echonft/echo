import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import { parseFetchResponse } from '@echo/nft-scan/helpers/parse-fetch-response'
import { mapGetNftsRequestToQueryStringParams } from '@echo/nft-scan/mappers/map-get-nfts-request-to-query-string-params'
import type { GetNftsByAccountRequest } from '@echo/nft-scan/types/request/get-nfts-by-account-request'
import type { GetNftsByAccountResponse } from '@echo/nft-scan/types/response/get-nfts-by-account-response'
import { stringify } from 'qs'
import { partialRight, pipe, prop } from 'ramda'

export async function fetchNft(args: GetNftsByAccountRequest): Promise<GetNftsByAccountResponse> {
  const { fetch, chain, accountAddress } = args
  const query = pipe(mapGetNftsRequestToQueryStringParams, partialRight(stringify, [{ addQueryPrefix: true }]))(args)
  const url = `${getBaseUrl(chain)}/account/own/${accountAddress}${query}`
  const response = await fetch(url, fetchInit)
  if (!response.ok) {
    throw Error(
      `error fetching NFTs for ${accountAddress}: ${JSON.stringify({ url, status: response.statusText }, undefined, 2)}`
    )
  }
  return pipe(prop('data'), parseFetchResponse<GetNftsByAccountResponse>)(response)
}
