'use client'
import { type Collection } from '@echo/model/types/collection'
import { type ListingItem } from '@echo/model/types/listing-item'
import { type ListingTarget } from '@echo/model/types/listing-target'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CollectionSearchBoxManager } from '@echo/ui/components/collection/search/collection-search-box-manager'
import { NewSenderItemsContainer } from '@echo/ui/components/item/new/new-sender-items-container'
import { NewListingSliderExpirationContainer } from '@echo/ui/components/listing/new/new-listing-slider-expiration-container'
import { NewListingSliderTargetContainer } from '@echo/ui/components/listing/new/new-listing-slider-target-container'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
  target: ListingTarget | undefined
  collections: Collection[] | undefined
  onCollectionSelectionChange?: (selection: Collection | undefined) => unknown
  onTargetAmountChange?: (targetCollectionId: string, amount: number) => unknown
  onRemoveTarget?: (targetCollectionId: string) => unknown
  onRemoveItem?: (itemNftId: string) => unknown
  onFinalize?: () => unknown
  onDismissListing?: () => unknown
}

export const NewListingSlider: FunctionComponent<Props> = ({
  items,
  target,
  collections,
  onCollectionSelectionChange,
  onTargetAmountChange,
  onRemoveTarget,
  onRemoveItem,
  onFinalize,
  onDismissListing
}) => {
  const t = useTranslations('listing.new.bottomSlider')
  function onSelectionChange(selection: Collection | undefined) {
    onCollectionSelectionChange?.(selection)
  }

  return (
    <div className={clsx('flex', 'flex-col', 'gap-6', 'py-3', 'pb-32', 'relative')}>
      <CollectionSearchBoxManager
        placeholder={t('searchPlaceholder')}
        selectedOption={target?.collection}
        options={collections}
        onSelectionChange={onSelectionChange}
      />
      <NewListingSliderTargetContainer target={target} onRemove={onRemoveTarget} onEdit={onTargetAmountChange} />
      <NewSenderItemsContainer items={items} onRemove={onRemoveItem} />
      <NewListingSliderExpirationContainer />
      <div className={clsx('flex', 'items-center', 'justify-center', 'py-6', 'gap-5')}>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group')}
          disabled={isNilOrEmpty(items) || isNil(target)}
          onClick={onFinalize}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('finalizeBtn')}</span>
        </button>
        <LongPressButton
          id={'new-listing'}
          label={t('dismissBtn.label')}
          message={t('dismissBtn.message')}
          onFinish={onDismissListing}
        />
      </div>
    </div>
  )
}
