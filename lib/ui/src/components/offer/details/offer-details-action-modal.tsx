import { Modal } from '../../base/modal/modal'
import { OfferDetailsActionModalInnerContainer } from './offer-details-action-modal-inner-container'
import { OfferDetailsOfferActionModalTitle } from './offer-details-offer-action-modal-title'
import { OfferState } from '@echo/ui-model'
import { FunctionComponent, useEffect, useState } from 'react'

export interface OfferDetailsActionModalProps {
  offerState: OfferState
}

export const OfferDetailsActionModal: FunctionComponent<OfferDetailsActionModalProps> = ({ offerState }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (offerState === 'ACCEPTED' || offerState === 'CANCELLED' || offerState === 'REJECTED') {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [setIsOpen, offerState])

  // Should never happen but otherwise typescript complains on the typing
  if (offerState === 'OPEN' || offerState === 'INVALID') {
    return null
  }

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      renderTitle={() => <OfferDetailsOfferActionModalTitle state={offerState} />}
      renderDescription={() => (
        <OfferDetailsActionModalInnerContainer state={offerState} onClose={() => setIsOpen(false)} />
      )}
    />
  )
}
