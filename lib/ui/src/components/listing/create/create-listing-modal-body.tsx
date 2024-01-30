'use client'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { CollectionSearchBoxManager } from '@echo/ui/components/collection/search/collection-search-box-manager'
import type { CreateListingModalProps } from '@echo/ui/components/listing/create/create-listing-modal'
import { CreateListingModalButton } from '@echo/ui/components/listing/create/create-listing-modal-button'
import { CreateListingModalItems } from '@echo/ui/components/listing/create/create-listing-modal-items'
import { CreateListingModalTarget } from '@echo/ui/components/listing/create/create-listing-modal-target'
import { CreateListingModalTargetLayout } from '@echo/ui/components/listing/create/layout/create-listing-modal-target-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export const CreateListingModalBody: FunctionComponent<Omit<CreateListingModalProps, 'open' | 'onClose'>> = ({
  target,
  items,
  collections,
  loading,
  onCollectionSelectionChange,
  onTargetAmountChange,
  onClear,
  onContinue,
  onConfirm
}) => {
  const t = useTranslations('listing.new.confirmationModal')
  if (isNil(target) && isEmpty(items)) {
    return null
  }
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <CollectionSearchBoxManager
        options={collections}
        onSelectionChange={onCollectionSelectionChange}
        disabled={loading}
      />
      <CreateListingModalTargetLayout disabled={loading}>
        <CreateListingModalTarget target={target} onEdit={onTargetAmountChange} isMutating={loading} />
      </CreateListingModalTargetLayout>
      <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
      <CreateListingModalItems items={items} disabled={loading} />
      <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
        <CreateListingModalButton
          target={target}
          items={items}
          onConfirm={onConfirm}
          isMutating={loading}
          onContinue={onContinue}
        />
        <LongPressButton
          id={'new-listing-confirmation-btn'}
          label={t('clearBtn.label')}
          message={t('clearBtn.message')}
          loading={loading}
          onFinish={onClear}
        />
      </div>
    </div>
  )
}
