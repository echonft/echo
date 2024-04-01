import type { SearchResult } from '@echo/model/types/search-result'
import { SearchInput } from '@echo/ui/components/base/search/search-input'
import {
  SearchResultsContainer,
  type SearchResultsContainerProps
} from '@echo/ui/components/base/search/search-results-container'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { Combobox, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { isNil } from 'ramda'

interface Props<T> extends Pick<SearchResultsContainerProps<T>, 'style'> {
  results: SearchResult<T>[] | undefined
  searching: boolean
  onSearch?: (searchQuery: string) => unknown
  onSearchClear?: EmptyFunction
  onSelect?: (selection: SearchResult<T>) => void
}

export const SearchBox = <T,>({ results, searching, style, onSearch, onSearchClear, onSelect }: Props<T>) => {
  return (
    <div className={clsx('h-max', 'w-full', 'relative')}>
      <Combobox
        onChange={(selection: SearchResult<T>) => {
          onSelect?.(selection)
        }}
      >
        <SearchInput searching={searching} onSearch={onSearch} onClear={onSearchClear} />
        <Transition
          show={!isNil(results)}
          as={'div'}
          enter={'transition ease-in duration-100'}
          enterFrom={'opacity-0'}
          enterTo={'opacity-100'}
          leave={'transition ease-in duration-100'}
          leaveFrom={'opacity-100'}
          leaveTo={'opacity-0'}
          className={clsx('h-max', 'rounded-lg', 'absolute', 'top-14', 'inset-x-0')}
        >
          <SearchResultsContainer results={results} style={style} />
        </Transition>
      </Combobox>
    </div>
  )
}
