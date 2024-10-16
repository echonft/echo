import type { SearchResultCategory } from '@echo/model/types/search/search-result-category'

export interface SearchResultCategoryViewModel {
  category: SearchResultCategory
  count: number
}
