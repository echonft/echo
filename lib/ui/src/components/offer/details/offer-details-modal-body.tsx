'use client'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import type { OfferDetailsModalProps } from '@echo/ui/components/offer/details/offer-details-modal'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export const OfferDetailsModalBody: FunctionComponent<OfferDetailsModalProps> = ({
  offer,
  onClose,
  onRedeem,
  onSwap,
  onUpdate
}) => {
  if (isNil(offer)) {
    return null
  }
  return (
    <div className={clsx('w-[66vw]', 'h-max', 'max-w-[70rem]', 'p-4', 'px-8')}>
      <OfferDetails offer={offer} onClose={onClose} onRedeem={onRedeem} onSwap={onSwap} onUpdate={onUpdate} />
    </div>
  )
}
