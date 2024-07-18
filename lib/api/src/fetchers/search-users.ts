import { apiPathProvider } from '@echo/api/routing/api/api-path-provider'
import type { SearchResponse } from '@echo/api/types/responses/search-response'
import type { SearchResult } from '@echo/model/types/search-result'
import type { Username } from '@echo/model/types/username'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import axios from 'axios'
import { stringify } from 'qs'
import { concat, path } from 'ramda'

export function searchUsers(q: string): Promise<SearchResult<Username>[]> {
  return axios
    .get<SearchResponse<Username>>(
      concat(apiPathProvider.user.search.getUrl(), stringify({ q }, { addQueryPrefix: true })),
      {
        withCredentials: true
      }
    )
    .then(nonNullableReturn(path(['data', 'results'])))
}
