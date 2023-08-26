import { ModalOfferState } from '../../../types/modal-offer-state'
import { ConfirmationIconSvg } from '../../base/svg/confirmation-icon-svg'
import { OfferDetailsOfferActionModalButtonSwitch } from './offer-details-offer-action-modal-button-switch'
import { OfferDetailsOfferActionModalSubtitle } from './offer-details-offer-action-modal-subtitle'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export interface OfferDetailsActionModalInnerContainerProps {
  state: ModalOfferState
  onClose?: () => unknown
}

export const OfferDetailsActionModalInnerContainer: FunctionComponent<OfferDetailsActionModalInnerContainerProps> = ({
  state,
  onClose
}) => {
  const t = useTranslations('offer.new.confirmationModal')
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
