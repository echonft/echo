'use client'
import type { SearchResult } from '@echo/model/types/search-result'
import { SearchInput } from '@echo/ui/components/base/search/search-input'
import { SearchResultsContainer } from '@echo/ui/components/base/search/search-results-container'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Nullable } from '@echo/utils/types/nullable'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { isEmpty, isNil, pick } from 'ramda'
import { useCallback, useEffect, useRef, useState } from 'react'

interface Props<T> {
  results: SearchResult<T>[] | undefined
  searching: boolean
  style?: {
    categories?: {
      show?: boolean
    }
    placeHolder?: string
  }
  onSearch?: (searchQuery: string) => unknown
  onSearchClear?: EmptyFunction
  onSelect?: (selection: SearchResult<T>) => void
}

export const SearchBox = <T,>({ results, searching, style, onSearch, onSearchClear, onSelect }: Props<T>) => {
  const [query, setQuery] = useState<Nullable<string>>()
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  const onChange = useCallback(
    (query: Nullable<string>) => {
      setQuery(query)
      if (isEmpty(query)) {
        onSearchClear?.()
      }
    },
    [setQuery]
  )

  // clear the timeout if needed
  useEffect(
    () => () => {
      if (!isNil(timeoutRef.current)) {
        clearTimeout(timeoutRef.current)
      }
    },
    [timeoutRef]
  )

  return (
    <div className={clsx('h-max', 'w-full', 'relative')}>
      <Combobox
        onChange={(selection: SearchResult<T>) => {
          if (!isNil(selection)) {
            onSelect?.(selection)
          }
        }}
        onClose={() => {
          setQuery(null)
          onSearchClear?.()
        }}
      >
        <SearchInput
          query={query}
          searching={searching}
          onSearch={onSearch}
          onChange={onChange}
          style={unlessNil<NonNullable<typeof style>, Pick<NonNullable<typeof style>, 'placeHolder'>>(
            pick(['placeHolder'])
          )(style)}
        />
        <AnimatePresence>
          <SearchResultsContainer
            results={results}
            style={unlessNil<NonNullable<typeof style>, Pick<NonNullable<typeof style>, 'categories'>>(
              pick(['categories'])
            )(style)}
          />
        </AnimatePresence>
      </Combobox>
    </div>
  )
}
