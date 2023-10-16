import type { Collection } from '@echo/model/types/collection'
import { CollectionSearchBox } from '@echo/ui/components/collection/search/collection-search-box'
import { stringIncludes } from '@echo/utils/fp/string-includes'
import { filter, isNil, pipe, prop, toLower } from 'ramda'
import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  placeholder: string
  options: Collection[] | undefined
  selectedOption: Collection | undefined
  name?: string
  onSelectionChange?: (selection: Collection | undefined) => unknown
}

export const CollectionSearchBoxManager: FunctionComponent<Props> = ({
  placeholder,
  name,
  options,
  onSelectionChange,
  selectedOption
}) => {
  const [searching, setSearching] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<Collection[]>()
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
      placeholder={placeholder}
      name={name}
      options={filteredOptions}
      selectedOption={selectedOption}
      searching={searching}
      onSearch={filterOptions}
      onSearchClear={resetOptions}
      onSelectionChange={onSelectionChange}
    />
  )
}
