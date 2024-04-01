import { compareSearchResults } from '@echo/model/helpers/search/compare-search-results'
import { filterSearchResultsByCategory } from '@echo/model/helpers/search/filter-search-results-by-category'
import type { SearchResult as SearchResultModel } from '@echo/model/types/search-result'
import type { SearchResultCategory } from '@echo/model/types/search-result-category'
import { SearchResults } from '@echo/ui/components/base/search/search-results'
import { SearchResultsCategories } from '@echo/ui/components/base/search/search-results-categories'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { isNil, pipe, sort } from 'ramda'
import { useCallback, useEffect, useState } from 'react'

export interface SearchResultsContainerProps<T> {
  results: Nullable<SearchResultModel<T>[]>
  style?: {
    categories?: {
      show?: boolean
    }
  }
}

export const SearchResultsContainer = <T,>({ results, style }: SearchResultsContainerProps<T>) => {
  const [filteredResults, setFilteredResults] = useState<Nullable<SearchResultModel<T>[]>>()
  const filterResults = useCallback(
    (category: Nullable<SearchResultCategory>) => {
      if (!isNil(results)) {
        if (isNil(category)) {
          pipe(sort(compareSearchResults), setFilteredResults)(results)
        } else {
          pipe(filterSearchResultsByCategory<T>(category), sort(compareSearchResults), setFilteredResults)(results)
        }
      }
    },
    [results]
  )

  // update filtered results when underlying results change
  useEffect(() => {
    setFilteredResults(unlessNil(sort(compareSearchResults))(results))
  }, [results])

  return (
    <div className={clsx('h-max', 'w-full', 'rounded-lg', 'bg-dark-450')}>
      <SearchResultsCategories show={style?.categories?.show} results={results} onChange={filterResults} />
      <SearchResults results={filteredResults} style={style} />
    </div>
  )
}
