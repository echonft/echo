import { Offer } from '../../types/offer'
import { User } from '../../types/user'
import { PaddedContainer } from '../layout/padded-container'
import { OfferRow as OfferComponent } from './offer-row'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export interface OffersProvidedProps {
  offers: Offer[]
  user: User
}

export const OffersProvided: FunctionComponent<OffersProvidedProps> = ({ offers, user }) => {
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'gap-12')}>
        {offers.map((offer) => (
          <OfferComponent offer={offer} isReceiver={offer.receiver.id === user.id} key={offer.id} />
        ))}
      </div>
    </PaddedContainer>
  )
}
