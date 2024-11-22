import type { SearchResult as SearchResultModel } from '@echo/model/types/search-result'
import { SearchResult, type SearchResultProps } from '@echo/ui/components/base/search/search-result'
import { SearchResultEmpty } from '@echo/ui/components/base/search/search-result-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { addIndex, isEmpty, isNil, map } from 'ramda'
import type { FunctionComponent } from 'react'

interface Props {
  results: SearchResultModel[]
  style?: Nullable<{
    categories?: {
      show?: boolean
    }
  }>
  onSelect?: (selection: SearchResultModel) => unknown
}

export const SearchResults: FunctionComponent<Props> = ({ results, style, onSelect }) => {
  function getSearchResultStyle(index: number): SearchResultProps['style'] {
    if (index === 0 && !style?.categories?.show) {
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
  const mapIndexed = addIndex<SearchResultModel>(map)
  return (
    <>
      {mapIndexed(
        (result: SearchResultModel, index: number) => (
          <SearchResult key={result.id} result={result} style={getSearchResultStyle(index)} onSelect={onSelect} />
        ),
        results
      )}
    </>
  )
}
