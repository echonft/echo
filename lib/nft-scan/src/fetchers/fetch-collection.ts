import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import type { GetCollectionRequest } from '@echo/nft-scan/types/request/get-collection-request'
import { getCollectionResponseSchema } from '@echo/nft-scan/validators/get-collection-response-schema'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { stringify } from 'qs'
import { applySpec, defaultTo, partialRight, pipe, prop } from 'ramda'

export async function fetchCollection(
  args: GetCollectionRequest
): Promise<ReturnType<typeof getCollectionResponseSchema.parse>> {
  const { fetch, contract } = args
  const query = pipe(
    applySpec({
      show_attribute: pipe(prop('showAttribute'), defaultTo(false))
    }),
    partialRight(stringify, [{ addQueryPrefix: true }])
  )(args)
  const url = `${getBaseUrl(contract.chain)}/collections/${contract.address}${query}`
  const init = await fetchInit(args.apiKey)
  const response = await fetch(url, init)
  if (!response.ok) {
    throw Error(
      `error fetching collection ${contract.address}: ${JSON.stringify(
        { url, status: response.statusText },
        undefined,
        2
      )}`
    )
  }
  return parseResponse(getCollectionResponseSchema)(response)
}
