import { SearchIconSvg } from '@echo/ui/components/base/svg/search-icon-svg'
import { CollectionSearchComboboxInputClearButton } from '@echo/ui/components/collection/search/collection-search-combobox-input-clear-button'
import { Combobox } from '@headlessui/react'
import { clsx } from 'clsx'
import { isEmpty, isNil } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'
import { debounce } from 'throttle-debounce'

interface Props {
  placeholder?: string
  onSearch?: (searchQuery: string) => unknown
  onClear?: () => unknown
}

export const CollectionSearchComboboxInput: FunctionComponent<Props> = ({ placeholder, onClear, onSearch }) => {
  const search = useCallback(
    (searchQuery: string) => {
      if (isEmpty(searchQuery)) {
        onClear?.()
      }
      if (searchQuery.length > 1) {
        onSearch?.(searchQuery)
      }
    },
    [onClear, onSearch]
  )
  const debouncedSearch = debounce(200, search)
  const debouncedClear = isNil(onClear) ? undefined : debounce(200, onClear)

  return (
    <Combobox.Button as={'div'} className={clsx('relative', 'items-center', 'bg-dark-400', 'rounded-lg', 'w-full')}>
      <span className={clsx('text-yellow-500', 'absolute', 'left-2.5', 'top-2')}>
        <SearchIconSvg />
      </span>
      <CollectionSearchComboboxInputClearButton
        className={clsx('absolute', 'right-2.5', 'top-2.5')}
        onClick={debouncedClear}
      />
      <Combobox.Input
        className={clsx(
          'h-9',
          'px-9',
          'w-full',
          'rounded-lg',
          'prose-label-sm-semi',
          'text-white',
          'bg-transparent',
          'placeholder:text-white/50',
          'outline-none'
        )}
        onBlur={() => {
          onClear?.()
        }}
        onChange={(event) => {
          debouncedSearch(event.target.value)
        }}
        placeholder={placeholder}
      />
    </Combobox.Button>
  )
}
