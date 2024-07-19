import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { openseaApiPathProvider } from '@echo/opensea/services/routing/opensea-api-path-provider'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { pick } from 'ramda'

export async function fetchCollection(args: WithLoggerType<GetCollectionRequest>): Promise<CollectionResponse> {
  const { fetch, slug } = args
  const url = openseaApiPathProvider.collection.fetch.getUrl(pick(['chain', 'slug'], args))
  const logger = args.logger?.child({ url, fetcher: fetchCollection.name })
  const response = await throttleFetch({ fetch, url, logger })
  if (!response.ok) {
    logger?.error({ slug }, 'error fetching collection')
    return Promise.reject(Error(`error fetching collection ${slug}`))
  }
  return parseFetchResponse<CollectionResponse>(response)
}
