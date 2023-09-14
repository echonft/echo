import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import { OfferDetailsOfferActionModalButtonSwitch } from '@echo/ui/components/offer/details/offer-details-offer-action-modal-button-switch'
import { OfferDetailsOfferActionModalSubtitle } from '@echo/ui/components/offer/details/offer-details-offer-action-modal-subtitle'
import type { ModalOfferState } from '@echo/ui/types/modal-offer-state'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

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
