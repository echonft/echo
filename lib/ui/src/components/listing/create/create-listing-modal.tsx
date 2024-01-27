'use client'
import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import { type ListingItem } from '@echo/model/types/listing-item'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { CollectionSearchBoxManager } from '@echo/ui/components/collection/search/collection-search-box-manager'
import { CreateListingModalButton } from '@echo/ui/components/listing/create/create-listing-modal-button'
import { CreateListingModalItems } from '@echo/ui/components/listing/create/create-listing-modal-items'
import { CreateListingModalTarget } from '@echo/ui/components/listing/create/create-listing-modal-target'
import { CreateListingModalTargetLayout } from '@echo/ui/components/listing/create/layout/create-listing-modal-target-layout'
import type { Target } from '@echo/ui/types/target'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  target: Target | undefined
  items: ListingItem[]
  open: boolean
  collections: CollectionProviderResult[] | undefined
  isMutating?: boolean
  onCollectionSelectionChange?: (selection: CollectionProviderResult | undefined) => unknown
  onTargetAmountChange?: (targetCollectionSlug: string, amount: number) => unknown
  onClear?: VoidFunction
  onContinue?: VoidFunction
  onConfirm?: VoidFunction
  onClose?: VoidFunction
}

export const CreateListingModal: FunctionComponent<Props> = ({
  target,
  items,
  open,
  collections,
  isMutating,
  onCollectionSelectionChange,
  onTargetAmountChange,
  onClear,
  onContinue,
  onConfirm,
  onClose
}) => {
  const t = useTranslations('listing.new.confirmationModal')
  if (isNil(target) && isEmpty(items)) {
    return null
  }
  const closeCallback = isMutating ? undefined : onClose
  return (
    <Modal
      open={open}
      onClose={closeCallback}
      backButton={{
        label: t('backBtn'),
        onBack: closeCallback
      }}
    >
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <CollectionSearchBoxManager
          options={collections}
          onSelectionChange={onCollectionSelectionChange}
          disabled={isMutating}
        />
        <CreateListingModalTargetLayout>
          <CreateListingModalTarget target={target} onEdit={onTargetAmountChange} isMutating={isMutating} />
        </CreateListingModalTargetLayout>
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
        <CreateListingModalItems items={items} />
        <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          <CreateListingModalButton
            target={target}
            items={items}
            onConfirm={onConfirm}
            isMutating={isMutating}
            onContinue={onContinue}
          />
          <LongPressButton
            id={'new-listing-confirmation-btn'}
            label={t('clearBtn.label')}
            message={t('clearBtn.message')}
            loading={isMutating}
            onFinish={onClear}
          />
        </div>
      </div>
    </Modal>
  )
}
