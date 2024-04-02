'use client'
import type { SearchResult } from '@echo/model/types/search-result'
import { SearchInput } from '@echo/ui/components/base/search/search-input'
import { SearchResultsContainer } from '@echo/ui/components/base/search/search-results-container'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Nullable } from '@echo/utils/types/nullable'
import { Combobox, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { isNil, pick } from 'ramda'
import { useEffect, useRef, useState } from 'react'

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
  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

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
          onSelect?.(selection)
        }}
      >
        <SearchInput
          query={query}
          searching={searching}
          ref={inputRef}
          onSearch={onSearch}
          onChange={(query: Nullable<string>) => {
            if (isNil(query)) {
              inputRef.current?.focus()
              onSearchClear?.()
            }
            setQuery(query)
          }}
          style={unlessNil<NonNullable<typeof style>, Pick<NonNullable<typeof style>, 'placeHolder'>>(
            pick(['placeHolder'])
          )(style)}
          onBlur={() => {
            // console.log(`isNil? ${isNil(resultsContainerRef.current)}`)
            timeoutRef.current = setTimeout(() => {
              const activeElementId = document.activeElement?.id
              if (!activeElementId?.startsWith('search-category')) {
                onSearchClear?.()
                setQuery(undefined)
              } else {
                inputRef.current?.focus()
              }
            }, 200)
          }}
        />
        <Transition
          show={!isNil(results)}
          as={'div'}
          enter={'transition ease-in duration-100'}
          enterFrom={'opacity-0'}
          enterTo={'opacity-100'}
          leave={'transition ease-in duration-100'}
          leaveFrom={'opacity-100'}
          leaveTo={'opacity-0'}
          className={clsx('h-max', 'rounded-lg', 'absolute', 'top-14', 'inset-x-0', 'z-10')}
        >
          <SearchResultsContainer
            results={results}
            style={unlessNil<NonNullable<typeof style>, Pick<NonNullable<typeof style>, 'categories'>>(
              pick(['categories'])
            )(style)}
          />
        </Transition>
      </Combobox>
    </div>
  )
}
