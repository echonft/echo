'use client'
import { linkProvider } from '@echo/api/services/routing/link-provider'
import type { CollectionProviderResult } from '@echo/api/types/providers/collection-provider-result'
import { type ListingItem } from '@echo/model/types/listing-item'
import { InternalLink } from '@echo/ui/components/base/internal-link'
import { LongPressButton } from '@echo/ui/components/base/long-press-button'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { HideIfNilOrEmpty } from '@echo/ui/components/base/utils/hide-if-nil-or-empty'
import { ShowIfNilOrEmpty } from '@echo/ui/components/base/utils/show-if-nil-or-empty'
import { CollectionSearchBoxManager } from '@echo/ui/components/collection/search/collection-search-box-manager'
import { NewListingConfirmationModalItemsContainer } from '@echo/ui/components/listing/new/new-listing-confirmation-modal-items-container'
import { NewListingModalTargetContainer } from '@echo/ui/components/listing/new/new-listing-modal-target-container'
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
  onTargetAmountChange?: (targetCollectionId: string, amount: number) => unknown
  onClear?: VoidFunction
  onContinue?: VoidFunction
  onConfirm?: VoidFunction
  onClose?: VoidFunction
}

export const NewListingConfirmationModal: FunctionComponent<Props> = ({
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
      title={t('title')}
      backButton={{
        label: t('backBtn'),
        onBack: closeCallback
      }}
    >
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <CollectionSearchBoxManager
          placeholder={t('searchPlaceholder')}
          selectedOption={target?.collection}
          options={collections}
          onSelectionChange={onCollectionSelectionChange}
          isMutating={isMutating}
        />
        <NewListingModalTargetContainer target={target} onEdit={onTargetAmountChange} isMutating={isMutating} />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
        <NewListingConfirmationModalItemsContainer items={items} />
        <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          <ShowIfNilOrEmpty checks={items}>
            <InternalLink path={linkProvider.profile.items.get()}>
              <button className={clsx('btn-gradient', 'btn-size-alt', 'group')} onClick={onContinue}>
                <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('continueBtn')}</span>
              </button>
            </InternalLink>
          </ShowIfNilOrEmpty>
          <HideIfNilOrEmpty
            checks={items}
            render={() => (
              <button
                className={clsx('btn-gradient', 'btn-size-alt', 'group', isMutating && 'animate-pulse')}
                onClick={onConfirm}
                disabled={isMutating}
              >
                <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmBtn')}</span>
              </button>
            )}
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
