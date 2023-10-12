'use client'
import { EditIconSvg } from '@echo/ui/components/base/svg/edit-icon-svg'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { NewListingConfirmationModalItemsContainer } from '@echo/ui/components/listing/new/new-listing-confirmation-modal-items-container'
import { NewListingConfirmationModalTargetContainer } from '@echo/ui/components/listing/new/new-listing-confirmation-modal-target-container'
import { ListingItem } from '@echo/ui/types/model/listing-item'
import { ListingTarget } from '@echo/ui/types/model/listing-target'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  target: ListingTarget | undefined
  items: ListingItem[]
  show?: boolean
  confirming?: boolean
  onConfirm?: () => unknown
  onClose?: () => unknown
}

export const NewListingConfirmationModal: FunctionComponent<Props> = ({
  target,
  items,
  show,
  confirming,
  onConfirm,
  onClose
}) => {
  const t = useTranslations('listing.new.confirmationModal')

  if (isNil(target) || isEmpty(items)) {
    return null
  }

  return (
    <Modal open={Boolean(show)} closeDisabled={confirming} onClose={() => onClose?.()} title={t('title')}>
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <NewListingConfirmationModalTargetContainer target={target} />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
        <NewListingConfirmationModalItemsContainer items={items} />
        <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
          <button className={clsx('btn-action', 'btn-size-alt', 'group')} disabled={confirming} onClick={onClose}>
            <span className={clsx('btn-label-action')}>
              <EditIconSvg />
            </span>
            <span className={clsx('prose-label-lg', 'btn-label-action')}>{t('editBtn')}</span>
          </button>
          <button
            className={clsx('btn-gradient', 'btn-size-alt', 'group', confirming && 'animate-pulse')}
            onClick={onConfirm}
            disabled={confirming}
          >
            <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmBtn')}</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}
