'use client'
import { type OfferItem } from '@echo/model/types/offer-item'
import { EditIconSvg } from '@echo/ui/components/base/svg/edit-icon-svg'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { NewOfferConfirmationModalItemsContainer } from '@echo/ui/components/offer/new/new-offer-confirmation-modal-items-container'
import type { NonEmptyArray } from '@echo/utils/types/non-empty-array'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  receiverItems: NonEmptyArray<OfferItem>
  open: boolean
  onReset?: VoidFunction
  onContinue?: VoidFunction
  onClose?: VoidFunction
}

export const NewOfferConfirmationModal: FunctionComponent<Props> = ({
  receiverItems,
  open,
  onReset,
  onContinue,
  onClose
}) => {
  const t = useTranslations('offer.new.confirmationModal')

  return (
    <Modal open={open} onBack={() => onClose?.()} title={t('title')} onClose={() => onClose?.()} backButtonLabel={}>
      <div className={clsx('flex', 'flex-col', 'gap-6')}>
        <NewOfferConfirmationModalItemsContainer isReceiver={true} items={receiverItems} />
        <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
        <NewOfferConfirmationModalItemsContainer isReceiver={false} items={senderItems} />
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
