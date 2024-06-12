import { getBaseUrl } from '@echo/opensea/helpers/get-base-url'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import type { WithLoggerType } from '@echo/utils/types/with-logger'

export async function fetchCollection(args: WithLoggerType<GetCollectionRequest>): Promise<CollectionResponse> {
  const { fetch, slug, chain, logger } = args
  const url = `${getBaseUrl(chain)}/collections/${slug}`
  const response = await throttleFetch({ fetch, url, logger })
  if (!response.ok) {
    logger?.error({ fn: 'fetchCollection', slug, url }, 'error fetching collection')
    throw Error(`error fetching collection ${slug}`)
  }
  return parseFetchResponse<CollectionResponse>(response)
}
