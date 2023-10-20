'use client'
import { type UpdateOfferAction } from '@echo/api/types/update-offer-action'
import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { OfferDetailsOfferActionModalSubtitle } from '@echo/ui/components/offer/details/offer-details-offer-action-modal-subtitle'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  action: UpdateOfferAction
  open: boolean
  onClose?: () => unknown
}

export const OfferDetailsActionModal: FunctionComponent<Props> = ({ action, open, onClose }) => {
  const t = useTranslations('offer.details.actionModal')

  return (
    <Modal open={open} onClose={onClose} title={t(`${action}.title`)}>
      <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center', 'self-stretch')}>
        <OfferDetailsOfferActionModalSubtitle action={action} />
        <div className={clsx('flex', 'flex-row', 'justify-center', 'grow')}>
          <ConfirmationIconSvg />
        </div>
        <div className={clsx('flex', 'flex-row', 'items-center', 'justify-center', 'grow')}>
          <button className={clsx('btn-gradient', 'btn-size-alt', 'group', 'outline-none')} onClick={onClose}>
            <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('closeBtn')}</span>
          </button>
        </div>
      </div>
    </Modal>
  )
}
