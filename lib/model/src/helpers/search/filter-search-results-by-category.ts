import type { SearchResult } from '@echo/model/types/search-result'
import type { SearchResultCategory } from '@echo/model/types/search-result-category'
import { filter, propEq } from 'ramda'

export function filterSearchResultsByCategory<T>(
  category: SearchResultCategory
): (results: SearchResult<T>[]) => SearchResult<T>[] {
  return filter(propEq(category, 'category'))
}
