import type { SearchResultCategory } from '@echo/model/constants/search-result-category'
import type { SearchResult } from '@echo/model/types/search-result'
import { SearchResultCategories } from '@echo/ui/components/base/search/search-result-categories'
import { mapSearchResultsToCategories } from '@echo/ui/helpers/search/map-search-results-to-categories'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil, length, lt, map, pipe, prop, uniq } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  show?: boolean
  results: Nullable<SearchResult[]>
  onChange?: (category?: SearchResultCategory) => void
}

export const SearchResultsCategories: FunctionComponent<Props> = ({ show, results, onChange }) => {
  if (
    show &&
    !isNil(results) &&
    pipe<[SearchResult[]], SearchResultCategory[], SearchResultCategory[], number, boolean>(
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
