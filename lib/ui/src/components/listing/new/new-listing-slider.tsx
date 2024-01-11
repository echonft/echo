'use client'
import type { CollectionProviderResult } from '@echo/api/services/providers/collections'
import { type ListingItem } from '@echo/model/types/listing-item'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CollectionSearchBoxManager } from '@echo/ui/components/collection/search/collection-search-box-manager'
import type { Target } from '@echo/ui/components/listing/new/new-listing-manager'
import { NewListingSliderExpirationContainer } from '@echo/ui/components/listing/new/new-listing-slider-expiration-container'
import { NewListingSliderTargetContainer } from '@echo/ui/components/listing/new/new-listing-slider-target-container'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  items: ListingItem[]
  target: Target | undefined
  collections: CollectionProviderResult[] | undefined
  onCollectionSelectionChange?: (selection: CollectionProviderResult | undefined) => unknown
  onTargetAmountChange?: (targetCollectionId: string, amount: number) => unknown
  onRemoveTarget?: (targetCollectionId: string) => unknown
  onRemoveItem?: (item: ListingItem) => unknown
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
  // FIXME Update with new layout
  // onRemoveItem,
  onFinalize,
  onDismissListing
}) => {
  const t = useTranslations('listing.new.bottomSlider')
  function onSelectionChange(selection: CollectionProviderResult | undefined) {
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
      {/*FIXME Need to use the proper layout. We can use NftsLayout and NftThumbnail probably */}
      {/*<NewSenderItemsContainer items={items} onRemove={onRemoveItem} />*/}
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
