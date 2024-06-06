import type { SearchResult as SearchResultModel } from '@echo/model/types/search-result'
import type { SearchResultCategory } from '@echo/model/types/search-result-category'
import { SearchResultCategories } from '@echo/ui/components/base/search/search-result-categories'
import { mapSearchResultsToCategories } from '@echo/ui/helpers/search/map-search-results-to-categories'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, length, lt, map, pipe, prop, uniq } from 'ramda'

interface Props<T> {
  show?: boolean
  results: Nullable<SearchResultModel<T>[]>
  onChange?: (category?: SearchResultCategory) => void
}

export const SearchResultsCategories = <T,>({ show, results, onChange }: Props<T>) => {
  if (
    show &&
    !isNil(results) &&
    pipe<[SearchResultModel<T>[]], SearchResultCategory[], SearchResultCategory[], number, boolean>(
      map(prop('category')),
      uniq,
      length,
      lt(1)
    )(results)
  ) {
    return <SearchResultCategories categories={mapSearchResultsToCategories(results)} onChange={onChange} />
  }
  return null
}
