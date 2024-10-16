import type { SearchResult } from '@echo/model/types/search/search-result'

export interface SearchResponse<T> {
  readonly results: SearchResult<T>[]
}
