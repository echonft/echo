import { NewListingSliderSearchCollectionOption } from './new-listing-slider-search-collection-option'
import { NewListingSliderSearchComboboxInput } from './new-listing-slider-search-combobox-input'
import { ListingTarget } from '@echo/ui-model'
import { Combobox, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { any, F, ifElse, isEmpty, isNil, pathEq } from 'ramda'
import { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react'

interface Props {
  placeholder: string
  name?: string
  options?: ListingTarget[]
  selectedOptions?: ListingTarget[]
  onSearch?: (searchQuery: string) => unknown
  onSelected?: (selected: ListingTarget[]) => unknown
  renderLoading?: () => ReactNode
}

const Component: ForwardRefRenderFunction<HTMLButtonElement, Props> = (
  { placeholder, name, options, selectedOptions, onSearch, onSelected, renderLoading },
  ref
) => {
  const t = useTranslations('listing.new.bottomSlider')
  return (
    <Combobox value={selectedOptions} onChange={onSelected} name={name} multiple>
      <NewListingSliderSearchComboboxInput placeholder={placeholder} onSearch={onSearch} ref={ref} />
      <Transition
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
          {isNil(options) ? (
            renderLoading?.()
          ) : isEmpty(options) ? (
            // TODO Design for this
            <div
              className={clsx('rounded-lg', 'p-2', 'flex', 'flex-row', 'h-[4.75rem]', 'items-center', 'justify-center')}
            >
              <span className={clsx('prose-header-sm-semi', 'text-white')}>{t('emptySearch')}</span>
            </div>
          ) : (
            options.map((target) => (
              <Combobox.Option value={target} key={target.collection.id} className={'cursor-pointer'}>
                <NewListingSliderSearchCollectionOption
                  pictureUrl={target.collection.profilePictureUrl}
                  selected={ifElse(
                    isNil,
                    F,
                    any(pathEq(target.collection.name, ['collection', 'name']))
                  )(selectedOptions)}
                  collectionName={target.collection.name}
                  collectionSupply={target.collection.totalSupply}
                />
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Transition>
    </Combobox>
  )
}

export const NewListingSliderSearchBox = forwardRef(Component)
