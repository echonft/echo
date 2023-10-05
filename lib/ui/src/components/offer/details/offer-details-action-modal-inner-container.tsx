import { ConfirmationIconSvg } from '@echo/ui/components/base/svg/confirmation-icon-svg'
import { OfferDetailsOfferActionModalSubtitle } from '@echo/ui/components/offer/details/offer-details-offer-action-modal-subtitle'
import type { ModalOfferState } from '@echo/ui/types/modal-offer-state'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  state: ModalOfferState
}

export const OfferDetailsActionModalInnerContainer: FunctionComponent<Props> = ({ state }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'gap-6', 'items-center')}>
      <OfferDetailsOfferActionModalSubtitle state={state} />
      <div className={clsx('flex', 'justify-center')}>
        <ConfirmationIconSvg />
      </div>
    </div>
  )
}
