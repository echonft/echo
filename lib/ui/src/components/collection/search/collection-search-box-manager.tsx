'use client'
import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import { CollectionSearchBox } from '@echo/ui/components/collection/search/collection-search-box'
import { stringIncludes } from '@echo/utils/fp/string-includes'
import { filter, isNil, pipe, prop, toLower } from 'ramda'
import { type FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  options: CollectionProviderResult[] | undefined
  disabled?: boolean
  onSelectionChange?: (selection: CollectionProviderResult | undefined) => unknown
}

export const CollectionSearchBoxManager: FunctionComponent<Props> = ({ options, onSelectionChange, disabled }) => {
  const [searching, setSearching] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<CollectionProviderResult[]>()
  const filterOptions = useCallback(
    (searchQuery: string) => {
      setSearching(true)
      if (!isNil(options)) {
        setFilteredOptions(filter(pipe(prop('name'), toLower, stringIncludes(toLower(searchQuery))))(options))
      }
    },
    [options]
  )
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

  // clear the timeout if needed
  useEffect(
    () => () => {
      if (!isNil(timeoutRef.current)) {
        clearTimeout(timeoutRef.current)
      }
    },
    []
  )

  function resetOptions() {
    if (searching) {
      setSearching(false)
      // wait for the transition to finish
      timeoutRef.current = setTimeout(() => {
        setFilteredOptions(undefined)
        timeoutRef.current = undefined
      }, 200)
    } else {
      setFilteredOptions(undefined)
    }
  }

  return (
    <CollectionSearchBox
      options={filteredOptions}
      searching={searching}
      onSearch={filterOptions}
      onSearchClear={resetOptions}
      onSelectionChange={onSelectionChange}
      disabled={disabled}
    />
  )
}
