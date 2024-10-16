import type { SearchResponse } from '@echo/api/types/responses/search-response'
import type { SearchResult } from '@echo/model/types/search/search-result'
import type { Username } from '@echo/model/types/username'
import { apiPathProvider } from '@echo/routing/api-path-provider'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import axios from 'axios'
import { path } from 'ramda'

export function searchUsers(q: string): Promise<SearchResult<Username>[]> {
  return axios
    .get<SearchResponse<Username>>(apiPathProvider.user.search.getUrl({ q }), {
      withCredentials: true
    })
    .then(nonNullableReturn(path(['data', 'results'])))
}
