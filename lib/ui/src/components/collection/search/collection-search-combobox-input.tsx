import { SearchIconSvg } from '@echo/ui/components/base/svg/search-icon-svg'
import { CollectionSearchComboboxInputClearButton } from '@echo/ui/components/collection/search/collection-search-combobox-input-clear-button'
import { classes } from '@echo/ui/helpers/classes'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { Combobox, Transition } from '@headlessui/react'
import { isEmpty, isNil } from 'ramda'
import { type FunctionComponent, useCallback } from 'react'
import { debounce } from 'throttle-debounce'

interface Props {
  searching?: boolean
  disabled?: boolean
  onSearch?: (searchQuery: string) => unknown
  onClear?: EmptyFunction
}

export const CollectionSearchComboboxInput: FunctionComponent<Props> = ({ searching, disabled, onClear, onSearch }) => {
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
    <Combobox.Button
      as={'div'}
      className={classes('relative', 'items-center', 'bg-dark-400', 'rounded-lg', 'w-full', disabled && 'opacity-40')}
    >
      <span className={classes('text-yellow-500', 'absolute', 'left-3', 'top-3.5')}>
        <SearchIconSvg width={32} height={32} />
      </span>
      <Transition
        show={searching}
        enter={'transition ease-in duration-100'}
        enterFrom={'opacity-0'}
        enterTo={'opacity-100'}
        leave={'transition ease-in duration-100'}
        leaveFrom={'opacity-100'}
        leaveTo={'opacity-0'}
      >
        <CollectionSearchComboboxInputClearButton
          className={classes('absolute', 'right-3', 'top-3.5')}
          onClick={debouncedClear}
        />
      </Transition>
      <Combobox.Input
        className={classes(
          'h-16',
          'px-14',
          'w-full',
          'rounded-lg',
          'prose-label-lg',
          'text-white',
          'bg-transparent',
          'outline-none'
        )}
        onBlur={() => {
          onClear?.()
        }}
        onChange={(event) => {
          debouncedSearch(event.target.value)
        }}
      />
    </Combobox.Button>
  )
}
