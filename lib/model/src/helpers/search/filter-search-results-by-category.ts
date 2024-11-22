import type { SearchResultCategory } from '@echo/model/constants/search-result-category'
import type { SearchResult } from '@echo/model/types/search-result'
import { filter, propEq } from 'ramda'

export function filterSearchResultsByCategory(
  category: SearchResultCategory
): (results: SearchResult[]) => SearchResult[] {
  return filter(propEq(category, 'category'))
}
