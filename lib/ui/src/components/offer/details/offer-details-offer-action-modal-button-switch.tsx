import { OfferDetailsOfferActionAcceptedButtons } from './offer-details-offer-action-accepted-buttons'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferDetailsOfferActionModalButtonSwitchProps {
  state: 'CANCELLED' | 'REJECTED' | 'ACCEPTED'
  onClose?: () => unknown
}

export const OfferDetailsOfferActionModalButtonSwitch: FunctionComponent<
  OfferDetailsOfferActionModalButtonSwitchProps
> = ({ state, onClose }) => (
  <div className={clsx('flex', 'flex-row', 'gap-4', 'items-center', 'justify-center')}>
    {state === 'ACCEPTED' && <OfferDetailsOfferActionAcceptedButtons onClose={onClose} />}
  </div>
)
