import { getBaseUrl } from '@echo/opensea/helpers/get-base-url'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { mapCollectionResponse } from '@echo/opensea/mappers/map-collection-response'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { andThen, pipe } from 'ramda'

export async function getCollection(args: GetCollectionRequest) {
  const { fetch, slug, testnet } = args
  const url = `${getBaseUrl(testnet)}/collections/${slug}`
  const response = await throttleFetch({ fetch, url })
  if (!response.ok) {
    throw Error(`error fetching collection ${slug}: {url: ${url}\nstatus:${response.statusText}}`)
  }
  return pipe(parseFetchResponse<CollectionResponse>, andThen(mapCollectionResponse))(response)
}
