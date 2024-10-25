import type { SearchResult } from '@echo/model/types/search-result'

export interface SearchResponse<T> {
  readonly results: SearchResult<T>[]
}
