import type { SearchResponse } from '@echo/api/types/responses/search-response'
import type { SearchResult } from '@echo/model/types/search/search-result'
import type { Slug } from '@echo/model/types/slug'
import { apiPathProvider } from '@echo/routing/api-path-provider'
import axios from 'axios'
import { path } from 'ramda'

export function searchCollections(q: string): Promise<SearchResult<Slug>[]> {
  return axios
    .get<SearchResponse<Slug>>(apiPathProvider.collection.search.getUrl({ q }), {
      withCredentials: true
    })
    .then(path(['data', 'results']))
}
