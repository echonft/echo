'use client'
import { Modal } from '@echo/ui/components/base/modal/modal'
import { OfferDetailsModalBody } from '@echo/ui/components/offer/details/offer-details-modal-body'
import { getOfferBackground } from '@echo/ui/helpers/offer/get-offer-background'
import { useBackground } from '@echo/ui/hooks/use-background'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { EmptyFunction } from '@echo/utils/types/empty-function'
import type { Nullable } from '@echo/utils/types/nullable'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export interface OfferDetailsModalProps {
  offer: Nullable<OfferWithRole>
  onClose?: EmptyFunction
  onUpdate?: (offer: OfferWithRole) => unknown
}

export const OfferDetailsModal: FunctionComponent<OfferDetailsModalProps> = ({ offer, onClose, onUpdate }) => {
  const { className } = useBackground(getOfferBackground(offer))
  return (
    <Modal open={!isNil(offer)} onClose={onClose} className={className}>
      <OfferDetailsModalBody offer={offer} onUpdate={onUpdate} />
    </Modal>
  )
}
