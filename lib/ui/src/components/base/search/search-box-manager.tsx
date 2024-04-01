'use client'
import type { SearchResult } from '@echo/model/types/search-result'
import { SearchBox } from '@echo/ui/components/base/search/search-box'
import type { SearchResultsContainerProps } from '@echo/ui/components/base/search/search-results-container'
import { isNil } from 'ramda'
import { useEffect, useRef, useState } from 'react'

export interface SearchBoxManagerProps<T> extends Pick<SearchResultsContainerProps<T>, 'style'> {
  resultsProvider: (query: string) => Promise<SearchResult<T>[]>
  onSelect?: (result: SearchResult<T>) => void
}

export const SearchBoxManager = <T,>({ resultsProvider, style, onSelect }: SearchBoxManagerProps<T>) => {
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<SearchResult<T>[] | undefined>(undefined)
  const search = (query: string) => {
    setSearching(true)
    void resultsProvider(query).then((response: SearchResult<T>[]) => {
      if (clearRequestedRef.current) {
        clearRequestedRef.current = false
        setResults(undefined)
      } else {
        setResults(response)
      }
      setSearching(false)
    })
  }
  const clearRequestedRef = useRef(false)
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

  function clear() {
    if (searching) {
      clearRequestedRef.current = true
    } else {
      setResults(undefined)
    }
  }

  return (
    <SearchBox
      results={results}
      searching={searching}
      style={style}
      onSearch={search}
      onSearchClear={clear}
      onSelect={(selection: SearchResult<T>) => {
        setResults(undefined)
        onSelect?.(selection)
      }}
    />
  )
}
