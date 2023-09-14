'use client'
import { Modal } from '@echo/ui/components/layout/modal/modal'
import { OfferDetailsActionModalInnerContainer } from '@echo/ui/components/offer/details/offer-details-action-modal-inner-container'
import { OfferDetailsOfferActionModalTitle } from '@echo/ui/components/offer/details/offer-details-offer-action-modal-title'
import type { ModalOfferState } from '@echo/ui/types/modal-offer-state'
import type { OfferState } from '@echo/ui/types/model/offer-state'
import { type FunctionComponent, useEffect, useState } from 'react'

interface Props {
  offerState: OfferState
}

export const OfferDetailsActionModal: FunctionComponent<Props> = ({ offerState }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  useEffect(() => {
    if (offerState === 'ACCEPTED' || offerState === 'CANCELLED' || offerState === 'REJECTED') {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [setIsOpen, offerState])

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      renderTitle={() => <OfferDetailsOfferActionModalTitle state={offerState as ModalOfferState} />}
      renderDescription={() => (
        <OfferDetailsActionModalInnerContainer state={offerState as ModalOfferState} onClose={() => setIsOpen(false)} />
      )}
    />
  )
}
