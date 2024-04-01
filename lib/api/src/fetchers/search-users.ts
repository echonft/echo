import { apiUrlProvider } from '@echo/api/routing/api-url-provider'
import type { SearchResponse } from '@echo/api/types/responses/search-response'
import type { SearchResult } from '@echo/model/types/search-result'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import axios from 'axios'
import { stringify } from 'qs'
import { concat, path } from 'ramda'

export function searchUsers(q: string): Promise<SearchResult<string>[]> {
  return axios
    .get<SearchResponse<string>>(
      concat(apiUrlProvider.user.search.getUrl(), stringify({ q }, { addQueryPrefix: true })),
      {
        withCredentials: true
      }
    )
    .then(nonNullableReturn(path(['data', 'results'])))
}
