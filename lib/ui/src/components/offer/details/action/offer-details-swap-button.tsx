'use client'
import { OfferDetailsSwapModal } from '@echo/ui/components/offer/details/action/swap/offer-details-swap-modal'
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
  onError?: EmptyFunction
  onSuccess?: (offer: OfferWithRole) => void
}

export const OfferDetailsSwapButton: FunctionComponent<Props> = ({
  offer,
  show,
  disabled,
  onClick,
  onSuccess,
  onError
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
          <span className={clsx('btn-label-gradient')}>{t('completeBtn')}</span>
        </button>
        <OfferDetailsSwapModal
          open={modalShown}
          offer={offer}
          onSuccess={(offer: OfferWithRole) => {
            setModalShown(false)
            onSuccess?.(offer)
          }}
          onError={onError}
          onClose={() => {
            setModalShown(false)
          }}
        />
      </>
    )
  }
  return null
}
