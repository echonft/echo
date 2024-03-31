import { compareSearchResults } from '@echo/model/helpers/search/compare-search-results'
import { filterSearchResultsByCategory } from '@echo/model/helpers/search/filter-search-results-by-category'
import type { SearchResult as SearchResultModel } from '@echo/model/types/search-result'
import type { SearchResultCategory } from '@echo/model/types/search-result-category'
import { SearchResult, type SearchResultProps } from '@echo/ui/components/base/search/search-result'
import { SearchResultsCategories } from '@echo/ui/components/base/search/search-results-categories'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { addIndex, isNil, map, pipe, sort } from 'ramda'
import { useCallback, useState } from 'react'

export interface SearchResultsProps<T> {
  results: SearchResultModel<T>[]
  style?: {
    categories?: {
      show?: boolean
    }
  }
  onSelect?: (value: SearchResultModel<T>) => void
}

export const SearchResults = <T,>({ results, style, onSelect }: SearchResultsProps<T>) => {
  const [filteredResults, setFilteredResults] = useState(sort(compareSearchResults, results))
  const filterResults = useCallback(
    (category: Nullable<SearchResultCategory>) => {
      if (isNil(category)) {
        pipe(sort(compareSearchResults), setFilteredResults)(results)
      } else {
        pipe(filterSearchResultsByCategory<T>(category), sort(compareSearchResults), setFilteredResults)(results)
      }
    },
    [results]
  )
  function getSearchResultStyle(index: number): SearchResultProps<T>['style'] {
    if (index === 0 && !style?.categories?.show) {
      return { rounded: 'top' }
    }
    if (index === filteredResults.length - 1) {
      return { rounded: 'bottom' }
    }
    return undefined
  }
  const mapIndexed = addIndex<SearchResultModel<T>>(map)

  return (
    <div className={clsx('h-max', 'w-full', 'rounded-lg', 'bg-dark-450')}>
      <SearchResultsCategories show={style?.categories?.show} results={results} onChange={filterResults} />
      {mapIndexed(
        (result, index) => (
          <SearchResult key={result.id} result={result} style={getSearchResultStyle(index)} onSelect={onSelect} />
        ),
        filteredResults
      )}
    </div>
  )
}
