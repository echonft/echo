import type { Collection } from '@echo/model/types/collection'
import { fetchContract } from '@echo/opensea/fetchers/fetch-contract'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { openseaApiPathProvider } from '@echo/opensea/services/routing/opensea-api-path-provider'
import type { FetchCollectionRequest } from '@echo/opensea/types/request/fetch-collection-request'
import { collectionResponseSchema } from '@echo/opensea/validators/collection-response-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { assoc, isNil, pick } from 'ramda'

export async function fetchCollection(args: WithLoggerType<FetchCollectionRequest>): Promise<Nullable<Collection>> {
  const { fetch, slug } = args
  const url = openseaApiPathProvider.collection.fetch.getUrl(pick(['chain', 'slug'], args))
  const logger = args.logger?.child({ url, fetcher: fetchCollection.name })
  const response = await throttleFetch({ fetch, url, logger })
  if (!response.ok) {
    logger?.error({ slug }, 'error fetching collection')
    return Promise.reject(Error(`error fetching collection ${slug}`))
  }
  const partialCollection = await parseResponse(collectionResponseSchema({ chain: args.chain, logger }))(response)
  if (isNil(partialCollection)) {
    return undefined
  }
  const contract = await fetchContract({ fetch, logger, contract: partialCollection.contract })
  return assoc('type', contract.contract_standard, partialCollection)
}
