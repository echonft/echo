import { isUserOfferReceiver } from '../../helpers/is-user-offer-receiver'
import { PaddedContainer } from '../layout/padded-container'
import { OfferRow as OfferComponent } from './offer-row'
import { Offer, User } from '@echo/ui-model'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

interface Props {
  offers: Offer[]
  user: User
}

export const OffersProvided: FunctionComponent<Props> = ({ offers, user }) => {
  return (
    <PaddedContainer>
      <div className={clsx('flex', 'flex-col', 'self-stretch', 'grow', 'gap-12')}>
        {offers.map((offer) => (
          <OfferComponent offer={offer} isReceiver={isUserOfferReceiver(user, offer)} key={offer.id} />
        ))}
      </div>
    </PaddedContainer>
  )
}
