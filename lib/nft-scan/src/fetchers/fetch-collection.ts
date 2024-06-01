import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import { parseFetchResponse } from '@echo/nft-scan/helpers/parse-fetch-response'
import type { GetCollectionRequest } from '@echo/nft-scan/types/request/get-collection-request'
import type { GetCollectionResponse } from '@echo/nft-scan/types/response/get-collection-response'
import { stringify } from 'qs'
import { applySpec, defaultTo, partialRight, pipe, prop } from 'ramda'

export async function fetchCollection(args: GetCollectionRequest): Promise<GetCollectionResponse> {
  const { fetch, contract } = args
  const query = pipe(
    applySpec({
      show_attribute: pipe(prop('showAttribute'), defaultTo(false))
    }),
    partialRight(stringify, [{ addQueryPrefix: true }])
  )(args)
  const url = `${getBaseUrl(contract.chain)}/collections/${contract.address}${query}`
  const response = await fetch(url, fetchInit)
  if (!response.ok) {
    throw Error(
      `error fetching collection ${contract.address}: ${JSON.stringify({ url, status: response.statusText }, undefined, 2)}`
    )
  }
  return pipe(prop('data'), parseFetchResponse<GetCollectionResponse>)(response)
}
