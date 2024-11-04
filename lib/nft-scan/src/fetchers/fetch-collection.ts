import type { Collection } from '@echo/model/types/collection'
import { FetchError } from '@echo/nft-scan/constants/errors/fetch-error'
import { nftScanApiPathProvider } from '@echo/nft-scan/constants/nft-scan-api-path-provider'
import { fetchInit } from '@echo/nft-scan/helpers/fetch-init'
import { error, warn } from '@echo/nft-scan/helpers/logger'
import type { FetchCollectionRequest } from '@echo/nft-scan/types/request/fetch-collection-request'
import { fetchCollectionResponseSchema } from '@echo/nft-scan/validators/fetch-collection-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import type { Nullable } from '@echo/utils/types/nullable'
import { andThen, ifElse, pick, pipe, prop } from 'ramda'

export async function fetchCollection({
  contract,
  showAttribute
}: FetchCollectionRequest): Promise<Nullable<Collection>> {
  const url = nftScanApiPathProvider.collection.fetch.withQuery({ showAttribute }).getUrl({ address: contract })
  const init = await fetchInit()
  const response = await fetch(url, init)
  if (!response.ok) {
    error({ collection: { contract }, url, response: pick(['status'], response) }, FetchError.Collection)
    return Promise.reject(Error(FetchError.Collection))
  }

  return pipe(
    parseResponse(fetchCollectionResponseSchema),
    andThen(
      ifElse(
        prop('isSpam'),
        (_response) => {
          warn({ collection: { contract } }, 'collection is spam')
          return undefined
        },
        prop('collection')
      )
    )
  )(response)
}
