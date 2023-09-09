'use client'
import { ModalOfferState } from '../../../types/modal-offer-state'
import { Modal } from '../../layout/modal/modal'
import { OfferDetailsActionModalInnerContainer } from './offer-details-action-modal-inner-container'
import { OfferDetailsOfferActionModalTitle } from './offer-details-offer-action-modal-title'
import { OfferState } from '@echo/ui-model'
import { FunctionComponent, useEffect, useState } from 'react'

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
