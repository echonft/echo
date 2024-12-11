'use client'
import { OfferDetailsAcceptModalSwitch } from '@echo/ui/components/offer/details/action/accept/offer-details-accept-modal-switch'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useState } from 'react'

interface Props {
  offer: OfferWithRole
  show?: boolean
  disabled?: boolean
  onClick?: VoidFunction
  onError?: VoidFunction
  onSuccess?: (offer: OfferWithRole) => void
}

export const OfferDetailsAcceptButton: FunctionComponent<Props> = ({
  offer,
  show,
  disabled,
  onClick,
  onError,
  onSuccess
}) => {
  const t = useTranslations('offer.details')
  const [modalShown, setModalShown] = useState(false)
  if (show) {
    return (
      <>
        <button
          className={clsx('btn-gradient', 'group', disabled && 'animate-pulse')}
          onClick={() => {
            onClick?.()
            setModalShown(true)
          }}
          disabled={disabled}
        >
          <span className={clsx('btn-label-gradient')}>{t('acceptBtn')}</span>
        </button>
        <OfferDetailsAcceptModalSwitch
          open={modalShown}
          offer={offer}
          onError={() => {
            setModalShown(false)
            onError?.()
          }}
          onSuccess={(offer: OfferWithRole) => {
            setModalShown(false)
            onSuccess?.(offer)
          }}
          onClose={() => {
            setModalShown(false)
          }}
        />
      </>
    )
  }
  return null
}
