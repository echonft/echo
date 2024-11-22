'use client'
import type { SearchResult } from '@echo/model/types/search-result'
import { SearchInput } from '@echo/ui/components/base/search/search-input'
import { SearchResultsPanel } from '@echo/ui/components/base/search/search-results-panel'
import { isNilOrEmpty } from '@echo/utils/helpers/is-nil-or-empty'
import { unlessNil } from '@echo/utils/helpers/unless-nil'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { pick } from 'ramda'
import { type FunctionComponent, useState } from 'react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { debounce } from 'throttle-debounce'

export interface SearchBoxProps {
  resultsProvider: (query: string) => Promise<SearchResult[]>
  style?: {
    categories?: {
      show?: boolean
    }
    placeHolder?: string
    backgroundColor?: string
  }
  onSelect?: (result: SearchResult) => void
}

export const SearchBox: FunctionComponent<SearchBoxProps> = ({ resultsProvider, style, onSelect }) => {
  const ref = useDetectClickOutside({
    onTriggered: () => {
      setSearching(false)
      setQuery(undefined)
      setResults(undefined)
    }
  })
  const [query, setQuery] = useState<Nullable<string>>()
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<SearchResult[] | undefined>(undefined)
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
        style={unlessNil<NonNullable<typeof style>, Pick<NonNullable<typeof style>, 'placeHolder' | 'backgroundColor'>>(
          pick(['placeHolder', 'backgroundColor'])
        )(style)}
      />
      <AnimatePresence>
        <SearchResultsPanel
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
