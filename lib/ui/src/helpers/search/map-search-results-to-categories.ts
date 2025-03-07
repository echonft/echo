import type { SearchResultCategory } from '@echo/model/constants/search-result-category'
import type { SearchResult } from '@echo/model/types/search-result'
import type { SearchResultCategoryViewModel } from '@echo/ui/types/search-result-category-view-model'
import { applySpec, collectBy, head, length, map, pipe, prop } from 'ramda'

export function mapSearchResultsToCategories(results: SearchResult[]): SearchResultCategoryViewModel[] {
  return pipe<[SearchResult[]], SearchResult[][], SearchResultCategoryViewModel[]>(
    collectBy(prop('category')),
    map(
      applySpec<SearchResultCategoryViewModel>({
        category: pipe<[SearchResult[]], SearchResult, SearchResultCategory>(head, prop('category')),
        count: length
      })
    )
  )(results)
}
