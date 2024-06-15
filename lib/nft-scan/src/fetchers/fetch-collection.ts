import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { getBaseUrl } from '@echo/nft-scan/helpers/get-base-url'
import type { GetCollectionRequest } from '@echo/nft-scan/types/request/get-collection-request'
import { getCollectionResponseSchema } from '@echo/nft-scan/validators/get-collection-response-schema'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { stringify } from 'qs'
import { applySpec, defaultTo, partialRight, pick, pipe, prop } from 'ramda'

export async function fetchCollection(
  args: WithLoggerType<GetCollectionRequest>
): Promise<ReturnType<typeof getCollectionResponseSchema.parse>> {
  const { fetch, contract, logger } = args
  const query = pipe(
    applySpec({
      show_attribute: pipe(prop('showAttribute'), defaultTo(false))
    }),
    partialRight(stringify, [{ addQueryPrefix: true }])
  )(args)
  const url = `${getBaseUrl(contract.chain)}/collections/${contract.address}${query}`
  const init = await fetchInit(logger)
  const response = await fetch(url, init)
  if (!response.ok) {
    logger?.error(
      { fn: 'fetchCollection', collection: { contract }, url, response: pick(['status'], response) },
      'error fetching collection'
    )
    throw Error(`error fetching collection ${JSON.stringify(contract)}`)
  }
  return parseResponse(getCollectionResponseSchema)(response)
}
