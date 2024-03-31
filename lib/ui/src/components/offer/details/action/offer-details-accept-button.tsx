'use client'
import { OfferDetailsAcceptModal } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: OfferWithRole
  show?: boolean
  disabled?: boolean
  onClick?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => unknown
  onCancel?: EmptyFunction
}

export const OfferDetailsAcceptButton: FunctionComponent<Props> = ({
  offer,
  show,
  disabled,
  onClick,
  onSuccess,
  onCancel
}) => {
  const t = useTranslations('offer.details')
  const [modalShown, setModalShown] = useState(false)

  if (show) {
    return (
      <>
        <button
          className={clsx('btn-gradient', 'btn-size-alt', 'group')}
          onClick={() => {
            onClick?.()
            setModalShown(true)
          }}
          disabled={disabled}
        >
          <span className={clsx('prose-label-lg', 'btn-label-gradient')}>{t('acceptBtn')}</span>
        </button>
        <OfferDetailsAcceptModal
          open={modalShown}
          offer={offer}
          onSuccess={(offer: OfferWithRole) => {
            setModalShown(false)
            onSuccess?.(offer)
          }}
          onClose={() => {
            setModalShown(false)
            onCancel?.()
          }}
        />
      </>
    )
  }
  return null
}
