import type { SearchResultCategory } from '@echo/model/constants/search-result-category'

export interface SearchResultCategoryViewModel {
  category: SearchResultCategory
  count: number
}
