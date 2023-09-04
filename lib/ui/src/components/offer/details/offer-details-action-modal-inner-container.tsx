import { ModalOfferState } from '../../../types/modal-offer-state'
import { ConfirmationIconSvg } from '../../base/svg/confirmation-icon-svg'
import { OfferDetailsOfferActionModalButtonSwitch } from './offer-details-offer-action-modal-button-switch'
import { OfferDetailsOfferActionModalSubtitle } from './offer-details-offer-action-modal-subtitle'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  state: ModalOfferState
  onClose?: () => unknown
}

export const OfferDetailsActionModalInnerContainer: FunctionComponent<Props> = ({ state, onClose }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6')}>
      <OfferDetailsOfferActionModalSubtitle state={state} />
      <div className={clsx('flex', 'items-center', 'justify-center')}>
        <ConfirmationIconSvg />
      </div>
      <OfferDetailsOfferActionModalButtonSwitch state={state} onClose={onClose} />
    </div>
  )
}
