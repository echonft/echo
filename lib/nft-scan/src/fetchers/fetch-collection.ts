import type { Collection } from '@echo/model/types/collection'
import { fetchInit } from '@echo/nft-scan/constants/fetch-init'
import { nftScanApiPathProvider } from '@echo/nft-scan/services/routing/nft-scan-api-path-provider'
import type { GetCollectionRequest } from '@echo/nft-scan/types/request/get-collection-request'
import type { CollectionResponseSchemaReturn } from '@echo/nft-scan/validators/collection-response-schema'
import { getCollectionResponseSchema } from '@echo/nft-scan/validators/get-collection-response-schema'
import type { Nullable } from '@echo/utils/types/nullable'
import type { WithLoggerType } from '@echo/utils/types/with-logger'
import { parseResponse } from '@echo/utils/validators/parse-response'
import { andThen, ifElse, pick, pipe, prop, propEq } from 'ramda'

export async function fetchCollection(args: WithLoggerType<GetCollectionRequest>): Promise<Nullable<Collection>> {
  const { fetch, contract, logger } = args
  const url = nftScanApiPathProvider.collection.fetch.getUrl(contract, pick(['showAttribute'], args))
  const init = await fetchInit(logger)
  const response = await fetch(url, init)
  if (!response.ok) {
    logger?.error({ collection: { contract }, url, response: pick(['status'], response) }, 'error fetching collection')
    return Promise.reject(Error('error fetching collection'))
  }
  return pipe(
    parseResponse(getCollectionResponseSchema(contract.chain)),
    andThen(
      ifElse<[CollectionResponseSchemaReturn], Nullable<Collection>, Nullable<Collection>>(
        propEq(true, 'isSpam'),
        () => {
          logger?.warn({ collection: { contract } }, 'collection is spam')
          return undefined
        },
        prop('collection')
      )
    )
  )(response)
}
