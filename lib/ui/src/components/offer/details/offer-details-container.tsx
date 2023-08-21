import { Offer } from '../../../types/offer'
import { OfferReceiverDetailsContainer } from '../new/offer-receiver-details-container'
import { offerDetailsContainerBackgroundImage } from '../offer-details-container-background-image'
import { OfferDetailsState } from './offer-details-state'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferDetailsContainerProps {
  offer: Offer
}

export const OfferDetailsContainer: FunctionComponent<OfferDetailsContainerProps> = ({ offer }) => {
  return (
    <div
      className={clsx(
        'flex',
        'flex-col',
        'gap-16',
        'p-4',
        'rounded-lg',
        offerDetailsContainerBackgroundImage(offer.state),
        'bg-white/[0.05]'
      )}
    >
      <div className={clsx('flex', 'flex-row', 'justify-between', 'items-center')}>
        <OfferReceiverDetailsContainer receiver={offer.receiver} />
        <OfferDetailsState state={offer.state} expiresAt={offer.expiresAt} />
      </div>
    </div>
  )
}
