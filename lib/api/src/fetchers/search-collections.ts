import { apiPathProvider } from '@echo/api/routing/api/api-path-provider'
import type { SearchResponse } from '@echo/api/types/responses/search-response'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Slug } from '@echo/model/types/slug'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import axios from 'axios'
import { stringify } from 'qs'
import { concat, path } from 'ramda'

export function searchCollections(q: string): Promise<SearchResult<Slug>[]> {
  return axios
    .get<SearchResponse<Slug>>(
      concat(apiPathProvider.collection.search.getUrl(), stringify({ q }, { addQueryPrefix: true })),
      {
        withCredentials: true
      }
    )
    .then(nonNullableReturn(path(['data', 'results'])))
}
