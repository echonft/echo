import type { SearchResult } from '@echo/model/types/search-result'
import type { SearchResultCategory } from '@echo/model/types/search-result-category'
import { SearchResultCategories } from '@echo/ui/components/base/search/search-result-categories'
import { mapSearchResultsToCategories } from '@echo/ui/helpers/search/map-search-results-to-categories'

interface Props<T> {
  show?: boolean
  results: SearchResult<T>[]
  onChange: (category?: SearchResultCategory) => void
}

export const SearchResultsCategories = <T,>({ show, results, onChange }: Props<T>) => {
  if (show) {
    return <SearchResultCategories categories={mapSearchResultsToCategories(results)} onChange={onChange} />
  }
  return null
}
