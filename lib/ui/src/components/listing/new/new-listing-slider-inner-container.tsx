'use client'
import { NewItemsContainer } from '../../item/new-items-container'
import { NewItemsEmptyContainer } from '../../item/new-items-empty-container'
import { NewListingSliderExpirationContainer } from './new-listing-slider-expiration-container'
import { NewListingSliderSearchBoxManager } from './new-listing-slider-search-box-manager'
import { NewListingSliderTargetsContainer } from './new-listing-slider-targets-container'
import { ListingItem, ListingTarget, NftCollection } from '@echo/ui-model'
import { isNilOrEmpty } from '@echo/utils'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import { FunctionComponent, useRef } from 'react'

interface Props {
  items: ListingItem[]
  targets: ListingTarget[]
  collections: Array<NftCollection> | undefined
  onCollectionSelectionChange?: (selection: Array<NftCollection>) => unknown
  onTargetAmountChange?: (targetCollectionId: string, amount: number) => unknown
  onRemoveTarget?: (targetCollectionId: string) => unknown
  onRemoveItem?: (itemNftId: string) => unknown
  onAddMoreItem?: () => unknown
  onDismissListing?: () => unknown
}

export const NewListingSliderInnerContainer: FunctionComponent<Props> = ({
  items,
  targets,
  collections,
  onCollectionSelectionChange,
  onTargetAmountChange,
  onRemoveTarget,
  onRemoveItem,
  onAddMoreItem,
  onDismissListing
}) => {
  const t = useTranslations('listing.new.bottomSlider')
  const searchBarRef = useRef<HTMLButtonElement | null>(null)

  // On add more target, we simply focus the user on the search box
  const onAddMoreTarget = () => {
    searchBarRef?.current?.click()
  }
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6', 'py-3', 'pb-32')}>
      <NewListingSliderSearchBoxManager
        placeholder={t('searchPlaceholder')}
        ref={searchBarRef}
        selectedOptions={map(prop('collection'), targets)}
        options={collections}
        onSelectionChange={onCollectionSelectionChange}
      />
      <NewListingSliderTargetsContainer
        targets={targets}
        onAddMore={onAddMoreTarget}
        onRemove={onRemoveTarget}
        onEdit={onTargetAmountChange}
      />
      <NewItemsContainer
        items={items}
        onRemove={onRemoveItem}
        onAddMore={onAddMoreItem}
        isReceiver={false}
        renderEmpty={() => <NewItemsEmptyContainer onAddMore={onAddMoreItem} />}
      />
      <NewListingSliderExpirationContainer />
      <div className={clsx('flex', 'items-center', 'justify-center', 'py-6', 'gap-5')}>
        <Disclosure.Button
          className={clsx('btn-gradient', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')}
          disabled={isNilOrEmpty(items) || isNilOrEmpty(targets)}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalizeBtn')}</span>
        </Disclosure.Button>
        <button
          className={clsx('bg-red-400', 'disabled:bg-red-400/40', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10')}
          onClick={onDismissListing}
        >
          <span
            className={clsx(
              'prose-label-lg',
              'text-dark-500',
              'group-active:group-hover:text-white',
              'group-disabled:text-dark-500'
            )}
          >
            {t('dismissBtn')}
          </span>
        </button>
      </div>
    </div>
  )
}
