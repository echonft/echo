'use client'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { OfferDetailsModalBody } from '@echo/ui/components/offer/details/offer-details-modal-body'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export interface OfferDetailsModalProps {
  offer: Nullable<OfferWithRole>
  onClose?: VoidFunction
  onRedeem?: (offer: OfferWithRole) => void
  onSwap?: VoidFunction
  onUpdate?: (offer: OfferWithRole) => void
}

export const OfferDetailsModal: FunctionComponent<OfferDetailsModalProps> = ({
  offer,
  onClose,
  onRedeem,
  onSwap,
  onUpdate
}) => {
  return (
    <Modal open={!isNil(offer)} onClose={onClose}>
      <OfferDetailsModalBody offer={offer} onClose={onClose} onRedeem={onRedeem} onSwap={onSwap} onUpdate={onUpdate} />
    </Modal>
  )
}
