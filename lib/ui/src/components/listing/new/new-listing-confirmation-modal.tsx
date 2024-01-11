'use client'
import type { CollectionProviderResult } from '@echo/api/services/providers/collections'
import { type ListingItem } from '@echo/model/types/listing-item'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CollectionSearchBoxManager } from '@echo/ui/components/collection/search/collection-search-box-manager'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { NewListingConfirmationModalItemsContainer } from '@echo/ui/components/listing/new/new-listing-confirmation-modal-items-container'
import type { Target } from '@echo/ui/components/listing/new/new-listing-manager'
import { NewListingSliderTargetContainer } from '@echo/ui/components/listing/new/new-listing-slider-target-container'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  target: Target | undefined
  items: ListingItem[]
  open: boolean
  collections: CollectionProviderResult[] | undefined
  onCollectionSelectionChange?: (selection: CollectionProviderResult | undefined) => unknown
  onTargetAmountChange?: (targetCollectionId: string, amount: number) => unknown
  onRemoveTarget?: (targetCollectionId: string) => unknown
  onClear?: VoidFunction
  onConfirm?: () => unknown
  onClose?: () => unknown
}

export const NewListingConfirmationModal: FunctionComponent<Props> = ({
  target,
  items,
  open,
  collections,
  onCollectionSelectionChange,
  onTargetAmountChange,
  onRemoveTarget,
  onClear,
  onConfirm,
  onClose
}) => {
  const t = useTranslations('listing.new.confirmationModal')

  if (isNil(target) && isEmpty(items)) {
    return null
  }

  return (
    <Modal open={open} onClose={onClose} title={t('title')} backButtonLabel={t('backBtn')}>
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <CollectionSearchBoxManager
          placeholder={'TODO'}
          selectedOption={target?.collection}
          options={collections}
          onSelectionChange={onCollectionSelectionChange}
        />
        <NewListingSliderTargetContainer target={target} onRemove={onRemoveTarget} onEdit={onTargetAmountChange} />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
        <NewListingConfirmationModalItemsContainer items={items} />
        <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          <button
            className={clsx('btn-gradient', 'btn-size-alt', 'group', isNil(onConfirm) && 'animate-pulse')}
            onClick={onConfirm}
            disabled={isNil(onConfirm)}
          >
            <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmBtn')}</span>
          </button>
          <LongPressButton
            id={'new-listing-confirmation-btn'}
            label={t('clearBtn')}
            message={t('clearBtnMessage')}
            loading={isNil(onClear)}
            onFinish={onClear}
          />
        </div>
      </div>
    </Modal>
  )
}
