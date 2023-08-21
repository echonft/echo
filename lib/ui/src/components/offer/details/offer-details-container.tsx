import { Offer } from '../../../types/offer'
import { offerDetailsContainerBackgroundImage } from '../offer-details-container-background-image'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OfferDetailsContainerProps {
  offer: Offer
}

export const OfferDetailsContainer: FunctionComponent<OfferDetailsContainerProps> = ({ offer }) => {
  return (
    <div
      className={clsx(
        'p-4',
        'rounded-lg',
        offerDetailsContainerBackgroundImage(offer.state),
        'bg-white/[0.05]',
        'h-52',
        'w-52'
      )}
    >
      {}
    </div>
  )
}
