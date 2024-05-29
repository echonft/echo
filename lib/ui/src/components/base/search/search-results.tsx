import type { SearchResult as SearchResultModel } from '@echo/model/types/search-result'
import { SearchResult, type SearchResultProps } from '@echo/ui/components/base/search/search-result'
import { SearchResultEmpty } from '@echo/ui/components/base/search/search-result-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { ComboboxOptions } from '@headlessui/react'
import { addIndex, isEmpty, isNil, map } from 'ramda'

interface Props<T> {
  results: Nullable<SearchResultModel<T>[]>
  style?: Nullable<{
    categories?: {
      show?: boolean
    }
  }>
}

// FIXME fix click on categories
export const SearchResults = <T,>({ results, style }: Props<T>) => {
  function getSearchResultStyle(index: number): SearchResultProps<T>['style'] {
    if (index === 0 && !style?.categories?.show) {
      return { rounded: 'top' }
    }
    if (index === results!.length - 1) {
      return { rounded: 'bottom' }
    }
    return undefined
  }

  if (isNil(results)) {
    return null
  }
  if (isEmpty(results)) {
    return (
      <div>
        <SearchResultEmpty />
      </div>
    )
  }

  const mapIndexed = addIndex<SearchResultModel<T>>(map)
  return (
    <ComboboxOptions static={true} as={'div'}>
      {mapIndexed(
        (result: SearchResultModel<T>, index: number) => (
          <SearchResult key={result.id} result={result} style={getSearchResultStyle(index)} />
        ),
        results
      )}
    </ComboboxOptions>
  )
}
