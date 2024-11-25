import type { SearchResult } from '@echo/model/types/search-result'
import {
  SearchResult as SearchResultComponent,
  type SearchResultProps
} from '@echo/ui/components/base/search/search-result'
import { SearchResultEmpty } from '@echo/ui/components/base/search/search-result-empty'
import { addIndex, isEmpty, isNil, map } from 'ramda'
import type { FunctionComponent, ReactNode } from 'react'

interface Props {
  results: SearchResult[]
  options?: {
    categories?: {
      show?: boolean
    }
  }
  onSelect?: (selection: SearchResult) => unknown
}

export const SearchResults: FunctionComponent<Props> = ({ results, options, onSelect }) => {
  function getSearchResultOptions(index: number): SearchResultProps['options'] {
    if (index === 0 && !options?.categories?.show) {
      return { rounded: 'top' }
    }
    if (!isNil(results) && index === results.length - 1) {
      return { rounded: 'bottom' }
    }
    return undefined
  }

  if (isEmpty(results)) {
    return <SearchResultEmpty />
  }
  const mapIndexed = addIndex<SearchResult, ReactNode>(map)
  return (
    <>
      {mapIndexed(
        (result, index) => (
          <SearchResultComponent
            key={result.id}
            result={result}
            options={getSearchResultOptions(index)}
            onSelect={onSelect}
          />
        ),
        results
      )}
    </>
  )
}
