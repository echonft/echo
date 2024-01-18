import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import { type Collection } from '@echo/model/types/collection'
import { CollectionSearchBoxOptions } from '@echo/ui/components/collection/search/collection-search-box-options'
import { CollectionSearchComboboxInput } from '@echo/ui/components/collection/search/collection-search-combobox-input'
import { Combobox, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

interface Props {
  placeholder: string
  options: CollectionProviderResult[] | undefined
  selectedOption: CollectionProviderResult | undefined
  searching: boolean
  name?: string
  isMutating?: boolean
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
  isMutating,
  onSearch,
  onSearchClear,
  onSelectionChange
}) => {
  return (
    <Combobox defaultValue={selectedOption} onChange={onSelectionChange} name={name} disabled={isMutating}>
      <CollectionSearchComboboxInput
        searching={searching}
        placeholder={placeholder}
        onSearch={onSearch}
        onClear={onSearchClear}
      />
      <Transition
        show={searching}
        enter={'transition ease-in duration-100'}
        enterFrom={'opacity-0'}
        enterTo={'opacity-100'}
        leave={'transition ease-in duration-100'}
        leaveFrom={'opacity-100'}
        leaveTo={'opacity-0'}
        className={clsx('absolute', 'top-24', 'inset-x-0', 'py-6')}
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
