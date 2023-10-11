import { CollectionSearchBoxOptions } from '@echo/ui/components/collection/search/collection-search-box-options'
import { CollectionSearchComboboxInput } from '@echo/ui/components/collection/search/collection-search-combobox-input'
import type { Collection } from '@echo/ui/types/model/collection'
import { Combobox, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  placeholder: string
  options: Collection[] | undefined
  selectedOption: Collection | undefined
  searching: boolean
  name?: string
  onSearch?: (searchQuery: string) => unknown
  onSearchClear?: () => unknown
  onSelectionChange?: (selection: Collection | undefined) => unknown
}

export const CollectionSearchBox: FunctionComponent<Props> = ({
  placeholder,
  name,
  options,
  selectedOption,
  searching,
  onSearch,
  onSearchClear,
  onSelectionChange
}) => {
  return (
    <Combobox defaultValue={selectedOption} onChange={onSelectionChange} name={name}>
      <CollectionSearchComboboxInput placeholder={placeholder} onSearch={onSearch} onClear={onSearchClear} />
      <Transition
        show={searching}
        enter={'transition ease-in duration-100'}
        enterFrom={'opacity-0'}
        enterTo={'opacity-100'}
        leave={'transition ease-in duration-100'}
        leaveFrom={'opacity-100'}
        leaveTo={'opacity-0'}
        className={clsx('absolute', 'top-12', 'z-20', 'inset-x-0', 'py-6')}
      >
        <Combobox.Options
          className={clsx('flex', 'flex-col', 'w-full', 'py-2', 'px-9', 'rounded-lg', 'bg-dark-400', 'gap-2.5')}
        >
          <CollectionSearchBoxOptions options={options} selectedOption={selectedOption} searching={searching} />
        </Combobox.Options>
      </Transition>
    </Combobox>
  )
}
