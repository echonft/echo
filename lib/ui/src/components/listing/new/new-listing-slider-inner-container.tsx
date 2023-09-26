'use client'
import { CollectionSearchBoxManager } from '@echo/ui/components/collection/search/collection-search-box-manager'
import { NewSenderItemsContainer } from '@echo/ui/components/item/new/new-sender-items-container'
import { NewListingSliderExpirationContainer } from '@echo/ui/components/listing/new/new-listing-slider-expiration-container'
import { NewListingSliderTargetsContainer } from '@echo/ui/components/listing/new/new-listing-slider-targets-container'
import type { Collection } from '@echo/ui/types/model/collection'
import type { ListingItem } from '@echo/ui/types/model/listing-item'
import type { ListingTarget } from '@echo/ui/types/model/listing-target'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { Disclosure } from '@headlessui/react'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { map, prop } from 'ramda'
import { type FunctionComponent, useRef } from 'react'

interface Props {
  items: ListingItem[]
  targets: ListingTarget[]
  collections: Array<Collection> | undefined
  onCollectionSelectionChange?: (selection: Array<Collection>) => unknown
  onTargetAmountChange?: (targetCollectionId: string, amount: number) => unknown
  onRemoveTarget?: (targetCollectionId: string) => unknown
  onRemoveItem?: (itemNftId: string) => unknown
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
      <CollectionSearchBoxManager
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
      <NewSenderItemsContainer items={items} onRemove={onRemoveItem} />
      <NewListingSliderExpirationContainer />
      <div className={clsx('flex', 'items-center', 'justify-center', 'py-6', 'gap-5')}>
        <Disclosure.Button
          className={clsx('btn-gradient', 'group', 'w-40', 'py-1.5', 'h-10')}
          disabled={isNilOrEmpty(items) || isNilOrEmpty(targets)}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalizeBtn')}</span>
        </Disclosure.Button>
        <button
          className={clsx('bg-red-400', 'disabled:bg-red-400/40', 'group', 'rounded-lg', 'w-40', 'py-1.5', 'h-10')}
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
