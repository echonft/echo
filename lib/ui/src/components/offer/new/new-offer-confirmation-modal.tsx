'use client'
import type { OfferItem } from '@echo/model/types/offer-item'
import { EditIconSvg } from '@echo/ui/components/base/svg/edit-icon-svg'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { NewOfferConfirmationModalItemsContainer } from '@echo/ui/components/offer/new/new-offer-confirmation-modal-items-container'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isEmpty } from 'ramda'
import { type FunctionComponent } from 'react'

interface Props {
  receiverItems: OfferItem[]
  senderItems: OfferItem[]
  show?: boolean
  confirming?: boolean
  onConfirm?: () => unknown
  onClose?: () => unknown
}

export const NewOfferConfirmationModal: FunctionComponent<Props> = ({
  receiverItems,
  senderItems,
  show,
  confirming,
  onConfirm,
  onClose
}) => {
  const t = useTranslations('offer.new.confirmationModal')

  if (isEmpty(receiverItems) || isEmpty(senderItems)) {
    return null
  }

  return (
    <Modal open={Boolean(show)} closeDisabled={confirming} onClose={() => onClose?.()} title={t('title')}>
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
