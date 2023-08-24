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

  console.log(`rendering offer details`)
  useEffect(() => {
    console.log(`will update set is open ${offerState}`)
    if (offerState === 'ACCEPTED' || offerState === 'CANCELLED' || offerState === 'REJECTED') {
      console.log(`will open`)
      setIsOpen(true)
    } else {
      console.log(`will close`)
      setIsOpen(false)
    }
  }, [setIsOpen, offerState])

  // Should never happen but otherwise typescript complains on the typing
  if (offerState === 'OPEN' || offerState === 'INVALID') {
    console.log('should not happen')
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
