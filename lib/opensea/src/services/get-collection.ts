import { BASE_URL } from '@echo/opensea/constants/base-url'
import { fetchInit } from '@echo/opensea/constants/fetch-init'
import { parseFetchResponse } from '@echo/opensea/helpers/parse-fetch-response'
import { throttleFetch } from '@echo/opensea/helpers/throttle-fetch'
import { mapCollectionResponse } from '@echo/opensea/mappers/map-collection-response'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { andThen, pipe } from 'ramda'

export async function getCollection(args: GetCollectionRequest) {
  const { fetch, slug } = args
  const response = await throttleFetch({ fetch, input: `${BASE_URL}/collections/${slug}`, init: fetchInit })
  if (!response.ok) {
    throw Error(`error fetching collection ${slug}: ${response.statusText}`)
  }
  return pipe(parseFetchResponse<CollectionResponse>, andThen(mapCollectionResponse))(response)
}
