import { CollectionSearchBox } from '@echo/ui/components/collection/search/collection-search-box'
import type { Collection } from '@echo/ui/types/model/collection'
import { stringIncludes } from '@echo/utils/fp/string-includes'
import { filter, isNil, pipe, prop, toLower } from 'ramda'
import { forwardRef, type ForwardRefRenderFunction, useCallback, useEffect, useRef, useState } from 'react'

interface Props {
  placeholder: string
  options: Array<Collection> | undefined
  selectedOptions: Array<Collection>
  name?: string
  onSelectionChange?: (selection: Array<Collection>) => unknown
}

const Component: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { placeholder, name, options, onSelectionChange, selectedOptions },
  ref
) => {
  const [searching, setSearching] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState<Array<Collection>>()
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
    }
  }

  return (
    <CollectionSearchBox
      placeholder={placeholder}
      name={name}
      ref={ref}
      options={filteredOptions}
      selectedOptions={selectedOptions}
      searching={searching}
      onSearch={filterOptions}
      onSearchClear={resetOptions}
      onSelectionChange={onSelectionChange}
    />
  )
}

export const CollectionSearchBoxManager = forwardRef(Component)
