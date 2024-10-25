import type { SearchResultCategory } from '@echo/model/constants/search-result-category'

export interface SearchResult<T> {
  category: SearchResultCategory
  id: string
  label: string
  pictureUrl: string
  value: T
}
