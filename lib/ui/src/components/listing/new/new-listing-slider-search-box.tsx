import { NewListingSearchCollectionOption } from './new-listing-search-collection-option'
import { NewListingSliderSearchComboboxInput } from './new-listing-slider-search-combobox-input'
import { NftCollection } from '@echo/ui-model'
import { Combobox, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { isEmpty, isNil } from 'ramda'
import { FunctionComponent, ReactNode } from 'react'

interface Props {
  placeholder: string
  options?: NftCollection[]
  selectedOptions?: NftCollection[]
  onSearch?: (searchQuery: string) => void
  onSelected?: (selected: NftCollection[]) => void
  renderLoading?: () => ReactNode
  name?: string
}

export const NewListingSliderSearchBox: FunctionComponent<Props> = ({
  placeholder,
  options,
  onSearch,

  renderLoading,
  name,
  selectedOptions,
  onSelected
}) => {
  return (
    <Combobox value={selectedOptions} onChange={onSelected} name={name} multiple>
      <NewListingSliderSearchComboboxInput placeholder={placeholder} onSearch={onSearch} />
      <Transition
        enter={'transition ease-in duration-100'}
        enterFrom={'opacity-0'}
        enterTo={'opacity-100'}
        leave={'transition ease-in duration-100'}
        leaveFrom={'opacity-100'}
        leaveTo={'opacity-0'}
        className={clsx('fixed', 'top-12', 'z-10', 'w-full', 'py-6')}
      >
        <Combobox.Options
          className={clsx('flex', 'flex-col', 'w-full', 'py-2', 'px-9', 'rounded-lg', 'bg-dark-400', 'gap-2.5')}
        >
          {isNil(options) ? (
            renderLoading?.()
          ) : isEmpty(options) ? (
            <span>No collections found</span>
          ) : (
            options.map((item) => (
              <Combobox.Option value={item} key={`${item.id}-${item.name}`} className={'cursor-pointer'}>
                <NewListingSearchCollectionOption
                  pictureUrl={item.profilePictureUrl}
                  collectionName={item.name}
                  collectionSupply={item.totalSupply}
                />
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  )
}
