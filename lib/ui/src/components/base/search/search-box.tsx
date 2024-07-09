'use client'
import type { SearchResult } from '@echo/model/types/search-result'
import { SearchInput } from '@echo/ui/components/base/search/search-input'
import { SearchResultsContainer } from '@echo/ui/components/base/search/search-results-container'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { unlessNil } from '@echo/utils/fp/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { pick } from 'ramda'
import { useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { debounce } from 'throttle-debounce'

export interface SearchBoxProps<T> {
  resultsProvider: (query: string) => Promise<SearchResult<T>[]>
  style?: {
    categories?: {
      show?: boolean
    }
    placeHolder?: string
  }
  onSelect?: (result: SearchResult<T>) => void
}

export const SearchBox = <T,>({ resultsProvider, style, onSelect }: SearchBoxProps<T>) => {
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setSearching(false)
      setQuery(undefined)
      setResults(undefined)
    }
  })
  const [query, setQuery] = useState<Nullable<string>>()
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<SearchResult<T>[] | undefined>(undefined)
  const search = debounce(800, async (query: string) => {
    setSearching(true)
    try {
      const response = await resultsProvider(query)
      setResults(response)
    } finally {
      setSearching(false)
    }
  })

  return (
    <div className={clsx('h-max', 'w-full', 'relative')} ref={ref}>
      <SearchInput
        query={query}
        searching={searching}
        onChange={(query) => {
          setQuery(query)
          if (isNilOrEmpty(query)) {
            setSearching(false)
            setResults(undefined)
          } else {
            search(query)
          }
        }}
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
          onSelect={onSelect}
        />
      </AnimatePresence>
    </div>
  )
}
