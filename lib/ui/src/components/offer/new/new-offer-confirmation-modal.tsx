'use client'
import { EditIconSvg } from '@echo/ui/components/base/svg/edit-icon-svg'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { ModalTitle } from '@echo/ui/components/layout/modal/modal-title'
import { NewOfferConfirmationModalItemsContainer } from '@echo/ui/components/offer/new/new-offer-confirmation-modal-items-container'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
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

  return (
    <Modal
      open={Boolean(show)}
      onClose={() => onClose?.()}
      renderTitle={() => <ModalTitle>{t('title')}</ModalTitle>}
      renderDescription={() => (
        <div className={clsx('flex', 'flex-col', 'gap-6')}>
          <div className={clsx('flex', 'flex-col', 'gap-6')}>
            <NewOfferConfirmationModalItemsContainer isReceiver items={receiverItems} />
            <div className={clsx('w-full', 'h-0.5', 'bg-white/[0.08]')} />
          </div>
          <NewOfferConfirmationModalItemsContainer isReceiver={false} items={senderItems} />
          <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
            <button
              className={clsx('btn-action', 'group', 'rounded-lg', 'w-40', 'py-1.5', '!h-10', 'gap-2.5')}
              disabled={confirming}
              onClick={onClose}
            >
              <span className={clsx('text-purple-900', 'group-active:group-hover:text-white')}>
                <EditIconSvg />
              </span>
              <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('editBtn')}</span>
            </button>
            <button
              className={clsx(
                'btn-gradient',
                'group',
                'rounded-lg',
                'w-40',
                'py-1.5',
                '!h-10',
                confirming && 'animate-pulse'
              )}
              onClick={onConfirm}
              disabled={confirming}
            >
              <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('confirmBtn')}</span>
            </button>
          </div>
        </div>
      )}
    />
  )
}
