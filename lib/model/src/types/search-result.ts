import type { SearchResultCategory } from '@echo/model/constants/search-result-category'

export interface SearchResult {
  category: SearchResultCategory
  id: string
  label: string
  pictureUrl: string
  value: string
}
