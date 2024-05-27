import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN
} from '@echo/model/constants/offer-states'
import { CreatedOfferAccepted } from '@echo/ui/components/offer/created/created-offer-accepted'
import { CreatedOfferCancelled } from '@echo/ui/components/offer/created/created-offer-cancelled'
import { CreatedOfferCreated } from '@echo/ui/components/offer/created/created-offer-created'
import { CreatedOfferExpired } from '@echo/ui/components/offer/created/created-offer-expired'
import { isOfferRoleReceiver } from '@echo/ui/helpers/offer/is-offer-role-receiver'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
}

export const CreatedOfferSwitch: FunctionComponent<Props> = ({ offer }) => {
  switch (offer.state) {
    case OFFER_STATE_OPEN:
      return <CreatedOfferCreated count={offer.senderItems.length} slug={offer.slug} />
    case OFFER_STATE_ACCEPTED:
      return <CreatedOfferAccepted count={offer.receiverItems.length} slug={offer.slug} />
    case OFFER_STATE_EXPIRED:
      return (
        <CreatedOfferExpired
          count={isOfferRoleReceiver(offer) ? offer.receiverItems.length : offer.senderItems.length}
        />
      )
    case OFFER_STATE_CANCELLED:
      return <CreatedOfferCancelled count={offer.senderItems.length} />
  }
  return null
}
