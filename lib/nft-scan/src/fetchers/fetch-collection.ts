import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import { parseFetchResponse } from '@echo/nft-scan/helpers/parse-fetch-response'
import type { GetCollectionRequest } from '@echo/nft-scan/types/request/get-collection-request'
import type { GetCollectionResponse } from '@echo/nft-scan/types/response/get-collection-response'
import { stringify } from 'qs'
import { pipe, prop } from 'ramda'

export async function fetchCollection(args: GetCollectionRequest): Promise<GetCollectionResponse> {
  const { fetch, chain, contractAddress, showAttribute } = args
  const url = `${getBaseUrl(chain)}/collections/${contractAddress}${stringify({ show_attributes: showAttribute ?? false }, { addQueryPrefix: true })}`
  const response = await fetch(url, fetchInit)
  if (!response.ok) {
    throw Error(`error fetching collection ${contractAddress}: {url: ${url}\nstatus:${response.statusText}}`)
  }
  return pipe(prop('data'), parseFetchResponse<GetCollectionResponse>)(response)
}
