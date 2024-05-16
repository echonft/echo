import { BASE_URL } from '@echo/opensea/constants/base-url'
import { nextFetchInit } from '@echo/opensea/constants/next-fetch-init'
import { parseNextFetchResponse } from '@echo/opensea/helpers/parse-next-fetch-response'
import { mapCollectionResponse } from '@echo/opensea/mappers/map-collection-response'
import type { GetCollectionRequest } from '@echo/opensea/types/request/get-collection-request'
import type { CollectionResponse } from '@echo/opensea/types/response/collection-response'
import { andThen, pipe } from 'ramda'

export async function getCollection(args: GetCollectionRequest) {
  const { fetch, slug } = args
  const response = await fetch(`${BASE_URL}/collections/${slug}`, nextFetchInit)
  return pipe(parseNextFetchResponse<CollectionResponse>, andThen(mapCollectionResponse))(response)
}
