'use client'
import { DetailsModalBodyLayout } from '@echo/ui/components/base/layout/details-modal-body-layout'
import { OfferDetails } from '@echo/ui/components/offer/details/offer-details'
import type { OfferDetailsModalProps } from '@echo/ui/components/offer/details/offer-details-modal'
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
    <DetailsModalBodyLayout>
      <OfferDetails offer={offer} onClose={onClose} onRedeem={onRedeem} onSwap={onSwap} onUpdate={onUpdate} />
    </DetailsModalBodyLayout>
  )
}
