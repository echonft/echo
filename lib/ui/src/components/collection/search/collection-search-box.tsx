import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import { type Collection } from '@echo/model/types/collection'
import { CollectionSearchBoxOptions } from '@echo/ui/components/collection/search/collection-search-box-options'
import { CollectionSearchComboboxInput } from '@echo/ui/components/collection/search/collection-search-combobox-input'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { Combobox, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  options: CollectionProviderResult[] | undefined
  searching: boolean
  name?: string
  disabled?: boolean
  onSearch?: (searchQuery: string) => unknown
  onSearchClear?: EmptyFunction
  onSelectionChange?: (selection: Collection | undefined) => unknown
}

export const CollectionSearchBox: FunctionComponent<Props> = ({
  name,
  options,
  searching,
  disabled,
  onSearch,
  onSearchClear,
  onSelectionChange
}) => {
  const t = useTranslations('collection.search')

  return (
    <div className={clsx('flex', 'flex-col', 'gap-2', 'h-max', 'w-full')}>
      <span className={clsx('prose-label-md', 'text-white', 'select-none', 'w-max', 'h-max', disabled && 'opacity-40')}>
        {t('label')}
      </span>
      <div className={clsx('h-max', 'w-full', 'relative')}>
        <Combobox onChange={onSelectionChange} name={name} disabled={disabled}>
          <CollectionSearchComboboxInput
            searching={searching}
            onSearch={onSearch}
            onClear={onSearchClear}
            disabled={disabled}
          />
          <Transition
            show={searching}
            as={'div'}
            enter={'transition ease-in duration-100'}
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leave={'transition ease-in duration-100'}
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
            className={clsx('absolute', 'left-0', 'py-2')}
          >
            <Combobox.Options
              className={clsx('flex', 'flex-col', 'w-max', 'py-2', 'px-2', 'rounded-lg', 'bg-dark-400', 'gap-2')}
            >
              <CollectionSearchBoxOptions options={options} searching={searching} />
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </div>
  )
}
