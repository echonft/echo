import { FetchError } from '@echo/nft-scan/constants/errors/fetch-error'
import { nftScanApiPathProvider } from '@echo/nft-scan/constants/nft-scan-api-path-provider'
import { fetchInit } from '@echo/nft-scan/helpers/fetch-init'
import { error } from '@echo/nft-scan/helpers/logger'
import type { FetchCollectionRequest } from '@echo/nft-scan/types/request/fetch-collection-request'
import type { FetchCollectionResponse } from '@echo/nft-scan/types/response/fetch-collection-response'
import { fetchCollectionResponseSchema } from '@echo/nft-scan/validators/fetch-collection-response-schema'
import { parseResponse } from '@echo/utils/helpers/parse-response'
import { pick } from 'ramda'

export async function fetchCollection({
  contract,
  showAttribute
}: FetchCollectionRequest): Promise<FetchCollectionResponse> {
  const url = nftScanApiPathProvider.collection.fetch.withQuery({ showAttribute }).getUrl({ address: contract })
  const init = await fetchInit()
  const response = await fetch(url, init)
  if (!response.ok) {
    error({ collection: { contract }, url, response: pick(['status'], response) }, FetchError.Collection)
    return Promise.reject(Error(FetchError.Collection))
  }
  return parseResponse(fetchCollectionResponseSchema, response)
}
