import type { SearchResult } from '@echo/model/types/search-result'
import type { SearchResultCategory } from '@echo/model/types/search-result-category'
import type { SearchResultCategoryViewModel } from '@echo/ui/types/search-result-category-view-model'
import { applySpec, collectBy, head, length, map, pipe, prop } from 'ramda'

export function mapSearchResultsToCategories<T>(results: SearchResult<T>[]): SearchResultCategoryViewModel[] {
  return pipe<[SearchResult<T>[]], SearchResult<T>[][], SearchResultCategoryViewModel[]>(
    collectBy(prop('category')),
    map(
      applySpec<SearchResultCategoryViewModel>({
        category: pipe<[SearchResult<T>[]], SearchResult<T>, SearchResultCategory>(head, prop('category')),
        count: length
      })
    )
  )(results)
}
