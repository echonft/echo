import { OfferDetailsOfferActionAcceptedButtons } from '@echo/ui/components/offer/details/offer-details-offer-action-accepted-buttons'
import type { ModalOfferState } from '@echo/ui/types/modal-offer-state'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

interface Props {
  state: ModalOfferState
  onClose?: () => unknown
}

export const OfferDetailsOfferActionModalButtonSwitch: FunctionComponent<Props> = ({ state, onClose }) => (
  <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
    {state === 'ACCEPTED' && <OfferDetailsOfferActionAcceptedButtons onClose={onClose} />}
  </div>
)
