import type { SearchResult as SearchResultModel } from '@echo/model/types/search-result'
import type { SearchResultCategory } from '@echo/model/types/search-result-category'
import { SearchResultCategories } from '@echo/ui/components/base/search/search-result-categories'
import { mapSearchResultsToCategories } from '@echo/ui/helpers/search/map-search-results-to-categories'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'

interface Props<T> {
  show?: boolean
  results: Nullable<SearchResultModel<T>[]>
  onChange: (category?: SearchResultCategory) => void
}

export const SearchResultsCategories = <T,>({ show, results, onChange }: Props<T>) => {
  if (show && !isNilOrEmpty(results)) {
    return <SearchResultCategories categories={mapSearchResultsToCategories(results)} onChange={onChange} />
  }
  return null
}
