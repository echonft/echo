import { CollectionSearchBoxOptions } from '@echo/ui/components/collection/search/collection-search-box-options'
import { CollectionSearchComboboxInput } from '@echo/ui/components/collection/search/collection-search-combobox-input'
import type { NftCollection } from '@echo/ui/types/model/nft-collection'
import { Combobox, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { forwardRef, type ForwardRefRenderFunction } from 'react'

interface Props {
  placeholder: string
  options: Array<NftCollection> | undefined
  selectedOptions: Array<NftCollection>
  searching: boolean
  name?: string
  onSearch?: (searchQuery: string) => unknown
  onSearchClear?: () => unknown
  onSelectionChange?: (selection: Array<NftCollection>) => unknown
}

const Component: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { placeholder, name, options, selectedOptions, searching, onSearch, onSearchClear, onSelectionChange },
  ref
) => {
  return (
    <Combobox value={selectedOptions} onChange={onSelectionChange} name={name} multiple>
      <CollectionSearchComboboxInput placeholder={placeholder} onSearch={onSearch} onClear={onSearchClear} ref={ref} />
      <Transition
        show={searching}
        enter={'transition ease-in duration-100'}
        enterFrom={'opacity-0'}
        enterTo={'opacity-100'}
        leave={'transition ease-in duration-100'}
        leaveFrom={'opacity-100'}
        leaveTo={'opacity-0'}
        className={clsx('fixed', 'top-12', 'z-20', 'w-full', 'py-6')}
      >
        <Combobox.Options
          className={clsx('flex', 'flex-col', 'w-full', 'py-2', 'px-9', 'rounded-lg', 'bg-dark-400', 'gap-2.5')}
        >
          <CollectionSearchBoxOptions options={options} selectedOptions={selectedOptions} searching={searching} />
        </Combobox.Options>
      </Transition>
    </Combobox>
  )
}

export const CollectionSearchBox = forwardRef(Component)
