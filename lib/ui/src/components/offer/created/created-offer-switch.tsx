import {
  OFFER_STATE_ACCEPTED,
  OFFER_STATE_CANCELLED,
  OFFER_STATE_COMPLETED,
  OFFER_STATE_EXPIRED,
  OFFER_STATE_OPEN,
  OFFER_STATE_REJECTED
} from '@echo/model/constants/offer-states'
import { CreatedOfferAccepted } from '@echo/ui/components/offer/created/created-offer-accepted'
import { CreatedOfferCancelled } from '@echo/ui/components/offer/created/created-offer-cancelled'
import { CreatedOfferCreated } from '@echo/ui/components/offer/created/created-offer-created'
import { CreatedOfferExecuted } from '@echo/ui/components/offer/created/created-offer-executed'
import { CreatedOfferExpired } from '@echo/ui/components/offer/created/created-offer-expired'
import { CreatedOfferRedeemed } from '@echo/ui/components/offer/created/created-offer-redeemed'
import { CreatedOfferRejected } from '@echo/ui/components/offer/created/created-offer-rejected'
import { isOfferRoleReceiver } from '@echo/ui/helpers/offer/is-offer-role-receiver'
import type { OfferWithRole } from '@echo/ui/types/offer-with-role'
import type { FunctionComponent } from 'react'

interface Props {
  offer: OfferWithRole
  redeemed?: boolean
}

export const CreatedOfferSwitch: FunctionComponent<Props> = ({ offer, redeemed }) => {
  if (redeemed) {
    return (
      <CreatedOfferRedeemed
        count={isOfferRoleReceiver(offer) ? offer.receiverItems.length : offer.senderItems.length}
      />
    )
  }
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
    case OFFER_STATE_REJECTED:
      return <CreatedOfferRejected />
    case OFFER_STATE_COMPLETED:
      // We display the opposite items here since they're swapped
      return (
        <CreatedOfferExecuted
          count={isOfferRoleReceiver(offer) ? offer.senderItems.length : offer.receiverItems.length}
        />
      )
    case OFFER_STATE_CANCELLED:
      return <CreatedOfferCancelled count={offer.senderItems.length} />
  }
}
