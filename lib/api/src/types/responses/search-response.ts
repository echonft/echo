import type { SearchResult } from '@echo/model/types/search-result'

export interface SearchResponse<T> {
  results: SearchResult<T>[]
}
